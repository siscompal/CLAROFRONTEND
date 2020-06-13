from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from configparser import ConfigParser
from celery import Celery
from kombu import serialization
from datetime import date, datetime, timedelta
from sermod import Recargas, Movimiento_saldo, Saldo, Usuarios_tipo, psql_db, Usuarios
from decimal import Decimal
import traceback, urllib.request, urllib.parse, locale, smtplib, subprocess, json, redis, sys, smpplib2.gsm as gsmcli, smpplib2.client as cliente, smpplib2.consts
__author__ = 'ODB13'
__path__ = '/opt/proyecto/servicios_postgresql'
app = Celery('demonio')
app.config_from_object('configuracion')
serialization.registry._decoders.pop('application/x-python-serialize')
locale.setlocale(locale.LC_ALL, 'es_CO.utf8')
max_pro = 3
paq_tigo = {'0': ['tigorecargas', 'http://tigorecargas.com.co/paq/'],  '1': [
       'tigorecargasdos', 'http://dos.tigorecargas.com.co/paq/'],
 '2': [
       'tigorecargaspaq', 'http://paquetes.tigorecargas.com.co/paq/'],
 '3': [
       'tigorecargastres', 'http://tres.tigorecargas.com.co/paq/']}
rec_tigo = {'0': ['tigorecargas', 'http://tigorecargas.com.co/reg/'],  '1': [
       'tigorecargasdos', 'http://dos.tigorecargas.com.co/reg/'],
 '2': [
       'tigorecargaspaq', 'http://paquetes.tigorecargas.com.co/reg/'],
 '3': [
       'tigorecargastres', 'http://tres.tigorecargas.com.co/reg/']}
red_is = redis.StrictRedis(host='localhost', port=6379, db=9)
red_is.set('0', '0')

def received_message_handler(pdu):
    return sys.stdout.write('SMSC has sent a request {} {}\n'.format(pdu.sequence, pdu.message_id))


def smsc_message_resp_handler(pdu):
    return sys.stdout.write('SMSC has sent a response to our request {} {}\n'.format(pdu.sequence, pdu.message_id))


def esme_sent_msg_handler(ssm):
    return sys.stdout.write('we are about to send message: {} with sequence_number:{} to phone_number: {}'.format(ssm.short_message, ssm.destination_addr, ssm.sequence))


@app.task
def deuda():
    total_total = 0
    ayer = date.today() - timedelta(days=1)
    template = ''
    for sal in Saldo.select():
        if template == '':
            template = '{}|{}|{}'.format(sal.ust.usu.nombre_completo, sal.ust.tip.nombre, locale.format('%d', sal.valor_saldo, True))
        else:
            template = '{}</br>{}|{}|{}'.format(template, sal.ust.usu.nombre_completo, sal.ust.tip.nombre, locale.format('%d', sal.valor_saldo, True))
        total_total += sal.valor_saldo

    template = 'Deuda Total: {}</br>{}'.format(locale.format('%d', total_total, True), template)
    print(template, flush=True)
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Deuda a la fecha del {} de {} del {}'.format(ayer.strftime('%d'), ayer.strftime('%B'), ayer.strftime('%Y'))
    msg['FROM'] = 'soporte@distrirecarga.com.co'
    msg['TO'] = 'soporteweb@siscompal.com'
    part2 = MIMEText(template, 'html')
    msg.attach(part2)
    s = smtplib.SMTP('localhost')
    s.sendmail('soporte@distrirecarga.com.co', ['soporteweb@siscompal.com'], msg.as_string())
    s.quit()
    try:
        psql_db.close()
        psql_db.close_all()
    except:
        try:
            print('[{}] DEUDA - [{}]'.format(datetime.now(), traceback.format_exc()), flush=True)
        except:
            pass


@app.task
def marcablancaconciliacion():
    print('[{}] INICIO marcablancaconciliacion'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S')), flush=True)
    a = ConfigParser()
    a.read('server.conf')
    hoy = date.today() - timedelta(days=1)
    for ip in a.sections():
        ids = a.get(ip, 'ids')
        tra = 0
        art = 0
        if Usuarios.select().where(Usuarios.estado == 1, Usuarios.estado_sistema == 1, Usuarios.id == ids).exists():
            usu = Usuarios.get(Usuarios.estado == 1, Usuarios.estado_sistema == 1, Usuarios.id == ids)
            eml = usu.email
            fln = 'con_fil/{}_{}.txt'.format(ip, hoy.strftime('%Y%m%d'))
            try:
                fil = open(str(fln), 'r')
                for b in fil.readlines():
                    tra += 1
                    c = b.split('|')
                    if len(c) > 6:
                        art += Decimal(c[6])
                        continue

                fil.close()
            except:
                print('[{}] archivo no existe = {}, error[{}] \n'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), fln, traceback.format_exc()), flush=True)

            print('trans = {} valor = {}'.format(tra, art), flush=True)
            fil = open(str(fln), 'ab')
            mnj = 'trans = {} valor = {}'.format(tra, art)
            fil.write(bytes(mnj, 'UTF-8'))
            fil.close()
            me = 'info@distrirecarga.com.co'
            msg = MIMEMultipart()
            msg['Subject'] = 'Archivo de Conciliación Ventas Distrirecarga - Día: {0}'.format(hoy.strftime('%d/%m/%Y'))
            msg['From'] = me
            msg['To'] = eml
            fil = open(str(fln), 'r')
            part2 = MIMEText(fil.read())
            fil.close()
            part2.add_header('Content-Disposition', 'attachment', filename=fln)
            msg.attach(part2)
            s = smtplib.SMTP('localhost')
            s.sendmail(me, eml, msg.as_string())
            s.quit()
            print('[{}] archivo enviado: {}, al: [{}]'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), fln, eml), flush=True)
            continue

    print('[{}] FIN marcablancaconciliacion'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S')), flush=True)
    try:
        psql_db.close()
        psql_db.close_all()
    except:
        try:
            print('[{}] DEUDA - [{}]'.format(datetime.now(), traceback.format_exc()), flush=True)
        except:
            pass


@app.task
def consiliacionemail():
    print('[{}] INICIO consiliacionemail'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S')), flush=True)
    ayer = date.today() - timedelta(days=1)
    fec_ini = '{0} 00:00:01'.format(ayer.strftime('%Y-%m-%d'))
    fec_fin = '{0} 23:59:59'.format(ayer.strftime('%Y-%m-%d'))
    cla = Recargas.select().where(Recargas.salida == 'claro', Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin), Recargas.estado == 1)
    mov = Recargas.select().where(Recargas.salida == 'movilway', Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin), Recargas.estado == 1)
    con_exr = Recargas.select().where(Recargas.salida == 'movilred', Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin), Recargas.estado == 1)
    etb = Recargas.select().where(Recargas.salida == 'etb', Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin), Recargas.estado == 1)
    directv = Recargas.select().where(Recargas.salida == 'directv', Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin), Recargas.estado == 1)
    tig = Recargas.select().where(Recargas.salida == 'tigorecargas', Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin), Recargas.estado == 1)
    tig_dos = Recargas.select().where(Recargas.salida == 'tigorecargasdos', Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin), Recargas.estado == 1)
    tig_tre = Recargas.select().where(Recargas.salida == 'tigorecargastres', Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin), Recargas.estado == 1)
    tig_paq = Recargas.select().where(Recargas.salida == 'tigorecargaspaq', Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin), Recargas.estado == 1)
    la_par = Recargas.select().where(Recargas.salida == 'lapartida', Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin), Recargas.estado == 1)
    la_wpl = Recargas.select().where(Recargas.salida == 'wplay', Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin), Recargas.estado == 1)
    total_total = 0
    total_cla = 0
    total_mov = 0
    total_con = 0
    total_etb = 0
    total_directv = 0
    total_tig = 0
    total_tig_dos = 0
    total_tig_tre = 0
    total_tig_paq = 0
    total_la_par = 0
    total_wpl = 0
    total_dat = 0
    total_tel = 0
    total_wha = 0
    total_and = 0
    total_uss = 0
    total_ser = 0
    con_dat = 0
    con_tel = 0
    con_wha = 0
    con_and = 0
    con_uss = 0
    con_ser = 0
    for d in directv:
        total_total += d.valor
        total_directv += d.valor
        if 'DATAFONOP' in d.obs:
            con_dat += 1
            total_dat += d.valor
        if 'TELEGRAM' in d.obs:
            con_tel += 1
            total_tel += d.valor
        if 'WHATSAPP' in d.obs:
            con_wha += 1
            total_wha += d.valor
        if 'MOVIL' in d.obs:
            con_and += 1
            total_and += d.valor
        if 'USSD' in d.obs:
            con_uss += 1
            total_uss += d.valor
        if 'SERVERWEB' in d.obs:
            con_ser += 1
            total_ser += d.valor
            continue

    for c in cla:
        total_total += c.valor
        total_cla += c.valor
        if 'DATAFONOP' in c.obs:
            con_dat += 1
            total_dat += c.valor
        if 'TELEGRAM' in c.obs:
            con_tel += 1
            total_tel += c.valor
        if 'WHATSAPP' in c.obs:
            con_wha += 1
            total_wha += c.valor
        if 'MOVIL' in c.obs:
            con_and += 1
            total_and += c.valor
        if 'USSD' in c.obs:
            con_uss += 1
            total_uss += c.valor
        if 'SERVERWEB' in c.obs:
            con_ser += 1
            total_ser += c.valor
            continue

    for m in mov:
        total_total += m.valor
        total_mov += m.valor
        if 'DATAFONOP' in m.obs:
            con_dat += 1
            total_dat += m.valor
        if 'TELEGRAM' in m.obs:
            con_tel += 1
            total_tel += m.valor
        if 'WHATSAPP' in m.obs:
            con_wha += 1
            total_wha += m.valor
        if 'MOVIL' in m.obs:
            con_and += 1
            total_and += m.valor
        if 'USSD' in m.obs:
            con_uss += 1
            total_uss += m.valor
        if 'SERVERWEB' in m.obs:
            con_ser += 1
            total_ser += m.valor
            continue

    for c in con_exr:
        total_total += c.valor
        total_con += c.valor
        if 'DATAFONOP' in c.obs:
            con_dat += 1
            total_dat += c.valor
        if 'TELEGRAM' in c.obs:
            con_tel += 1
            total_tel += c.valor
        if 'WHATSAPP' in c.obs:
            con_wha += 1
            total_wha += c.valor
        if 'MOVIL' in c.obs:
            con_and += 1
            total_and += c.valor
        if 'USSD' in c.obs:
            con_uss += 1
            total_uss += c.valor
        if 'SERVERWEB' in c.obs:
            con_ser += 1
            total_ser += c.valor
            continue

    for c in etb:
        total_total += c.valor
        total_etb += c.valor
        if 'DATAFONOP' in c.obs:
            con_dat += 1
            total_dat += c.valor
        if 'TELEGRAM' in c.obs:
            con_tel += 1
            total_tel += c.valor
        if 'WHATSAPP' in c.obs:
            con_wha += 1
            total_wha += c.valor
        if 'MOVIL' in c.obs:
            con_and += 1
            total_and += c.valor
        if 'USSD' in c.obs:
            con_uss += 1
            total_uss += c.valor
        if 'SERVERWEB' in c.obs:
            con_ser += 1
            total_ser += c.valor
            continue

    for c in tig:
        total_total += c.valor
        total_tig += c.valor
        if 'DATAFONOP' in c.obs:
            con_dat += 1
            total_dat += c.valor
        if 'TELEGRAM' in c.obs:
            con_tel += 1
            total_tel += c.valor
        if 'WHATSAPP' in c.obs:
            con_wha += 1
            total_wha += c.valor
        if 'MOVIL' in c.obs:
            con_and += 1
            total_and += c.valor
        if 'USSD' in c.obs:
            con_uss += 1
            total_uss += c.valor
        if 'SERVERWEB' in c.obs:
            con_ser += 1
            total_ser += c.valor
            continue

    for c in tig_dos:
        total_total += c.valor
        total_tig_dos += c.valor
        if 'DATAFONOP' in c.obs:
            con_dat += 1
            total_dat += c.valor
        if 'TELEGRAM' in c.obs:
            con_tel += 1
            total_tel += c.valor
        if 'WHATSAPP' in c.obs:
            con_wha += 1
            total_wha += c.valor
        if 'MOVIL' in c.obs:
            con_and += 1
            total_and += c.valor
        if 'USSD' in c.obs:
            con_uss += 1
            total_uss += c.valor
        if 'SERVERWEB' in c.obs:
            con_ser += 1
            total_ser += c.valor
            continue

    for c in tig_tre:
        total_total += c.valor
        total_tig_tre += c.valor
        if 'DATAFONOP' in c.obs:
            con_dat += 1
            total_dat += c.valor
        if 'TELEGRAM' in c.obs:
            con_tel += 1
            total_tel += c.valor
        if 'WHATSAPP' in c.obs:
            con_wha += 1
            total_wha += c.valor
        if 'MOVIL' in c.obs:
            con_and += 1
            total_and += c.valor
        if 'USSD' in c.obs:
            con_uss += 1
            total_uss += c.valor
        if 'SERVERWEB' in c.obs:
            con_ser += 1
            total_ser += c.valor
            continue

    for c in tig_paq:
        total_total += c.valor
        total_tig_paq += c.valor
        if 'DATAFONOP' in c.obs:
            con_dat += 1
            total_dat += c.valor
        if 'TELEGRAM' in c.obs:
            con_tel += 1
            total_tel += c.valor
        if 'WHATSAPP' in c.obs:
            con_wha += 1
            total_wha += c.valor
        if 'MOVIL' in c.obs:
            con_and += 1
            total_and += c.valor
        if 'USSD' in c.obs:
            con_uss += 1
            total_uss += c.valor
        if 'SERVERWEB' in c.obs:
            con_ser += 1
            total_ser += c.valor
            continue

    for c in la_wpl:
        total_total += c.valor
        total_wpl += c.valor
        if 'DATAFONOP' in c.obs:
            con_dat += 1
            total_dat += c.valor
        if 'TELEGRAM' in c.obs:
            con_tel += 1
            total_tel += c.valor
        if 'WHATSAPP' in c.obs:
            con_wha += 1
            total_wha += c.valor
        if 'MOVIL' in c.obs:
            con_and += 1
            total_and += c.valor
        if 'USSD' in c.obs:
            con_uss += 1
            total_uss += c.valor
        if 'SERVERWEB' in c.obs:
            con_ser += 1
            total_ser += c.valor
            continue

    for c in la_par:
        total_total += c.valor
        total_la_par += c.valor
        if 'DATAFONOP' in c.obs:
            con_dat += 1
            total_dat += c.valor
        if 'TELEGRAM' in c.obs:
            con_tel += 1
            total_tel += c.valor
        if 'WHATSAPP' in c.obs:
            con_wha += 1
            total_wha += c.valor
        if 'MOVIL' in c.obs:
            con_and += 1
            total_and += c.valor
        if 'USSD' in c.obs:
            con_uss += 1
            total_uss += c.valor
        if 'SERVERWEB' in c.obs:
            con_ser += 1
            total_ser += c.valor
            continue

    template = '\n    <u style="font-weight:bold;">Buenos Días.</u>\n    <br /><br />\n    <u>{0}</u>\n    <br /><br />\n    <u style="font-weight:bold;">CLARO</u><br />\n    TRANS                -> {3}<br />\n    VALOR                -> {4}\n    <br /><br />\n    <u style="font-weight:bold;">MOVILWAY</u><br />\n    TRANS                -> {5}<br />\n    VALOR                -> {6}\n    <br /><br />\n    <u style="font-weight:bold;">MOVILRED</u><br />\n    TRANS                -> {16}<br />\n    VALOR                -> {17}\n    <br /><br />\n    <u style="font-weight:bold;">ETB</u><br />\n    TRANS                -> {18}<br />\n    VALOR                -> {19}\n    <br /><br />\n    <u style="font-weight:bold;">DIRECTV</u><br />\n    TRANS                -> {24}<br />\n    VALOR                -> {25}\n    <br /><br />\n    <u style="font-weight:bold;">TIGORECARGAS</u><br />\n    TRANS                -> {22}<br />\n    VALOR                -> {23}\n    <br /><br />\n    <u style="font-weight:bold;">TIGORECARGASDOS</u><br />\n    TRANS                -> {26}<br />\n    VALOR                -> {27}\n    <br /><br />\n    <u style="font-weight:bold;">TIGORECARGASTRES</u><br />\n    TRANS                -> {30}<br />\n    VALOR                -> {31}\n    <br /><br />\n    <u style="font-weight:bold;">TIGORECARGASPAQ</u><br />\n    TRANS                -> {28}<br />\n    VALOR                -> {29}\n    <br /><br />\n    <u style="font-weight:bold;">LAPARTIDA</u><br />\n    TRANS                -> {32}<br />\n    VALOR                -> {33}\n    <br /><br />\n    <u style="font-weight:bold;">WPLAY</u><br />\n    TRANS                -> {34}<br />\n    VALOR                -> {35}\n    <br /><br />\n    <u style="font-weight:bold;">GENERAL</u>              -><br />\n    <u style="font-weight:bold;">DISTRIRECARGA</u>        -> {7}<br />\n    <u style="font-weight:bold;">DIFF</u>                 ->\n    <br />\n    ----------------------------------------------\n    <br />\n    <u style="font-weight:bold;">TELEGRAM</u><br />\n    TRANS                -> {20}<br />\n    VALOR                -> {21}\n    <br /><br />\n    <u style="font-weight:bold;">WHATSAPP</u><br />\n    TRANS                -> {8}<br />\n    VALOR                -> {9}\n    <br /><br />\n    <u style="font-weight:bold;">ANDROID</u><br />\n    TRANS                -> {10}<br />\n    VALOR                -> {11}\n    <br /><br />\n    <u style="font-weight:bold;">USSD</u><br />\n    TRANS                -> {12}<br />\n    VALOR                -> {13}\n    <br /><br />\n    <u style="font-weight:bold;">DATAFONOSP</u><br />\n    TRANS                -> {1}<br />\n    VALOR                -> {2}\n    <br /><br />\n    <u style="font-weight:bold;">MARCA BLANCA</u><br />\n    TRANS                -> {14}<br />\n    VALOR                -> {15}\n    <br />\n    --\n    '.format(ayer.strftime('%d %B %Y'), str(locale.format('%d', con_dat, True)), str(locale.format('%d', total_dat, True)), str(locale.format('%d', cla.count(), True)), str(locale.format('%d', total_cla, True)), str(locale.format('%d', mov.count(), True)), str(locale.format('%d', total_mov, True)), str(locale.format('%d', total_total, True)), str(locale.format('%d', con_wha, True)), str(locale.format('%d', total_wha, True)), str(locale.format('%d', con_and, True)), str(locale.format('%d', total_and, True)), str(locale.format('%d', con_uss, True)), str(locale.format('%d', total_uss, True)), str(locale.format('%d', con_ser, True)), str(locale.format('%d', total_ser, True)), str(locale.format('%d', con_exr.count(), True)), str(locale.format('%d', total_con, True)), str(locale.format('%d', etb.count(), True)), str(locale.format('%d', total_etb, True)), str(locale.format('%d', con_tel, True)), str(locale.format('%d', total_tel, True)), str(locale.format('%d', tig.count(), True)), str(locale.format('%d', total_tig, True)), str(locale.format('%d', directv.count(), True)), str(locale.format('%d', total_directv, True)), str(locale.format('%d', tig_dos.count(), True)), str(locale.format('%d', total_tig_dos, True)), str(locale.format('%d', tig_paq.count(), True)), str(locale.format('%d', total_tig_paq, True)), str(locale.format('%d', tig_tre.count(), True)), str(locale.format('%d', total_tig_tre, True)), str(locale.format('%d', la_par.count(), True)), str(locale.format('%d', total_la_par, True)), str(locale.format('%d', la_wpl.count(), True)), str(locale.format('%d', total_wpl, True)))
    print(template, flush=True)
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Conciliacion del {0} de {1} del {2}'.format(ayer.strftime('%d'), ayer.strftime('%B'), ayer.strftime('%Y'))
    msg['FROM'] = 'soporte@distrirecarga.com.co'
    msg['TO'] = 'soporteweb@siscompal.com'
    part2 = MIMEText(template, 'html')
    msg.attach(part2)
    s = smtplib.SMTP('localhost')
    s.sendmail('soporte@distrirecarga.com.co', ['soporteweb@siscompal.com'], msg.as_string())
    s.quit()
    print('[{}] FIN consiliacionemail'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S')), flush=True)
    try:
        psql_db.close()
        psql_db.close_all()
    except:
        try:
            print('[{}] DEUDA - [{}]'.format(datetime.now(), traceback.format_exc()), flush=True)
        except:
            pass


@app.task
def archivomensual():
    import time
    ayer = datetime.now() - timedelta(days=1)
    fln = 'rec_mes/{}.csv'.format(ayer.strftime('%Y%m'))
    lac = open(str(fln), 'ab')
    osc = 'rec_mes/{}_osc.csv'.format(ayer.strftime('%Y%m'))
    osc_lac = open(str(osc), 'ab')
    if ayer.strftime('%d') == '01':
        los_pri = 'Fecha;Estado;Proveedor;Numero;Valor;Operador;Producto;Cliente;%;Distribuidor;%;Mayorista;%;Observacion;\n'
        lac.write(bytes(los_pri, 'UTF-8'))
    osc_lac.write(bytes('Fecha;Estado;Proveedor;Numero;Valor;Operador;Producto;Cliente;%;Distribuidor;%;Mayorista;%;Observacion;\n', 'UTF-8'))
    mnj = '{};{};{};{};{};{};{};{};{};{};{};{};{};{};\n'
    fec_ini = '{} 00:00:01'.format(ayer.strftime('%Y-%m-%d'))
    fec_fin = '{} 23:59:59'.format(ayer.strftime('%Y-%m-%d'))
    txt = ''
    for r in Recargas.select().where(Recargas.fecha_creacion_sistema.between(fec_ini, fec_fin)).order_by(Recargas.fecha_creacion_sistema):
        nom_dis = ''
        nom_may = ''
        if r.may:
            if r.may > 0:
                may = Usuarios_tipo.get(Usuarios_tipo.id == r.may)
                nom_may = may.usu.nombre_completo
        if r.dis:
            if r.dis > 0:
                dis = Usuarios_tipo.get(Usuarios_tipo.id == r.dis)
                nom_dis = dis.usu.nombre_completo
        txt += mnj.format(r.fecha_creacion_sistema, r.estado, r.salida, r.numero, r.valor, r.pro.ope.operador, r.pro.producto, r.usr.usu.nombre_completo, r.p_c, nom_dis, r.p_d, nom_may, r.p_m, r.obs)
        time.sleep(3)

    lac.write(bytes(txt, 'UTF-8'))
    osc_lac.write(bytes(txt, 'UTF-8'))
    lac.close()
    try:
        psql_db.close()
        psql_db.close_all()
    except:
        try:
            print('[{}] DEUDA - [{}]'.format(datetime.now(), traceback.format_exc()), flush=True)
        except:
            pass


@app.task
def mar_sms_old_old(num_cli, men):
    if num_cli and str(num_cli).startswith('3'):
        try:
            print('----> [{}] ENTADA mar_sms [{} - {}]'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), num_cli, men))
            url_s = 'http://69.64.35.29/en/dosend.php?USERNAME=marcablanca&PASSWORD=m4rc4&smsprovider=2'
            dat = urllib.parse.urlencode({'Memo': men})
            url_s += '&smsnum={0}'.format(num_cli)
            url_s += '&method=2&{0}'.format(dat)
            req = urllib.request.Request(url=url_s, method='GET')
            response = urllib.request.urlopen(req)
            print('[{}] RESPUESTA [{}]'.format(num_cli, response), flush=True)
            return 'ENVIADO'
        except:
            print('[{}] ERROR AL ENVIAR EL SMS = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), traceback.format_exc()), flush=True)
            return 'ERROR'

    else:
        print('[{}] NO = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), num_cli), flush=True)


@app.task
def mar_sms_old(num_cli, men):
    if num_cli and str(num_cli).startswith('3'):
        try:
            print('----> [{}] ENTADA MARCA [{} - {}]'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), num_cli, men))
            men_cel = '{"text":"' + men + '", "param":[{"number":"' + num_cli + '"}]}'
            txt = "curl -d '{}' -H 'Content-Type:application/json' -u admin:m4qu1n4ss1sc0mp4l2016* http://181.49.149.134:9903/api/send_sms".format(men_cel).replace('\n', '')
            print('----> [{}] COMANDO MARCA [{}]'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), txt))
            res = subprocess.check_output(txt, shell=True)
            print(res)
            data_json_post = json.loads(res.decode())
            print('[{}] RESPUESTA MARCA [{}]'.format(num_cli, data_json_post), flush=True)
            return 'ENVIADO MARCA'
        except:
            print('[{}] ERROR AL ENVIAR EL SMS = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), traceback.format_exc()), flush=True)
            return 'ERROR'

    else:
        print('[{}] NO = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), num_cli), flush=True)


@app.task
def mar_sms(num_cli, men):
    if num_cli and str(num_cli).startswith('3'):
        try:
            import logging
            logging.basicConfig(level='DEBUG')
            men_env = '{}\n'.format(men)
            if len(men_env) > 126:
                men_env = men_env[:127]
            print('----> [{}] ENTADA [{} - {}] - {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), num_cli, men, men_env))
            parts, encoding_flag, msg_type_flag = gsmcli.make_parts(men_env * 1)
            client = cliente.Client('208.78.163.230', 2875)
            client.set_message_response_handler(smsc_message_resp_handler)
            client.set_message_received_handler(received_message_handler)
            client.set_esme_sent_msg_handler(esme_sent_msg_handler)
            client.connect()
            client.bind_transceiver(system_id='siscompal_515', password='f+e3rU')
            for part in parts:
                pdu = client.send_message(source_addr_ton=smpplib2.consts.SMPP_TON_INTL, dest_addr_ton=smpplib2.consts.SMPP_TON_INTL, destination_addr='57{}'.format(num_cli), short_message=part, data_coding=encoding_flag, esm_class=msg_type_flag, registered_delivery=True)
                print('->', pdu.sequence, flush=True)

            return 'ENVIADO MARCA'
        except:
            print('[{}] ERROR AL ENVIAR EL SMS = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), traceback.format_exc()), flush=True)
            return 'ERROR'

    else:
        print('[{}] NO = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), num_cli), flush=True)


@app.task
def env_sms_old_old(num_cli, men):
    if num_cli and str(num_cli).startswith('3'):
        try:
            url_s = 'http://69.64.35.29/en/dosend.php?USERNAME=root&PASSWORD=S1sc0mp4l13&smsprovider=2'
            dat = urllib.parse.urlencode({'Memo': men})
            url_s += '&smsnum={0}'.format(num_cli)
            url_s += '&method=2&{0}'.format(dat)
            req = urllib.request.Request(url=url_s, method='GET')
            response = urllib.request.urlopen(req)
            print('[{}] RESPUESTA [{}]'.format(num_cli, response), flush=True)
            return 'ENVIADO'
        except:
            print('[{0}] ERROR AL ENVIAR EL SMS = {1}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), traceback.format_exc()), flush=True)
            return 'ERROR'

    else:
        print('[{}] NO = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), num_cli), flush=True)


@app.task
def env_sms_old(num_cli, men):
    if num_cli and str(num_cli).startswith('3'):
        try:
            print('----> [{}] ENTADA [{} - {}]'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), num_cli, men))
            men_cel = '{"text":"' + men + '", "param":[{"number":"' + num_cli + '"}]}'
            txt = "curl -d '{}' -H 'Content-Type:application/json' -u admin:m4qu1n4ss1sc0mp4l2016* http://181.49.149.134:9903/api/send_sms".format(men_cel).replace('\n', '')
            print('----> [{}] COMANDO [{}]'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), txt))
            res = subprocess.check_output(txt, shell=True)
            print(res)
            data_json_post = json.loads(res.decode())
            print('[{}] RESPUESTA [{}]'.format(num_cli, data_json_post), flush=True)
            return 'ENVIADO'
        except:
            print('[{0}] ERROR AL ENVIAR EL SMS = {1}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), traceback.format_exc()), flush=True)
            return 'ERROR'

    else:
        print('[{}] NO = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), num_cli), flush=True)


@app.task
def env_sms(num_cli, men):
    if num_cli and str(num_cli).startswith('3'):
        try:
            import logging
            logging.basicConfig(level='DEBUG')
            men_env = '{}\n'.format(men)
            if len(men_env) > 126:
                men_env = men_env[:127]
            print('----> [{}] ENTADA [{} - {}] - {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), num_cli, men, men_env))
            parts, encoding_flag, msg_type_flag = gsmcli.make_parts(men_env * 1)
            client = cliente.Client('208.78.163.230', 2875)
            client.set_message_response_handler(smsc_message_resp_handler)
            client.set_message_received_handler(received_message_handler)
            client.set_esme_sent_msg_handler(esme_sent_msg_handler)
            client.connect()
            client.bind_transceiver(system_id='siscompal_515', password='f+e3rU')
            for part in parts:
                pdu = client.send_message(source_addr_ton=smpplib2.consts.SMPP_TON_INTL, dest_addr_ton=smpplib2.consts.SMPP_TON_INTL, destination_addr='57{}'.format(num_cli), short_message=part, data_coding=encoding_flag, esm_class=msg_type_flag, registered_delivery=True)
                print('->', pdu.sequence, flush=True)

            return 'ENVIADO'
        except:
            print('[{0}] ERROR AL ENVIAR EL SMS = {1}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), traceback.format_exc()), flush=True)
            return 'ERROR'

    else:
        print('[{}] NO = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), num_cli), flush=True)


def claro(data):
    data_json_post = None
    try:
        try:
            req = urllib.request.Request(url='http://72.55.153.11:8081/siscompal/api/v1.0/recarga/', data=data, method='POST', headers={'Content-Type': 'application/json'})
            f = urllib.request.urlopen(req)
            if f.status == 200 and f.reason == 'OK':
                text = f.read().decode('utf8')
                if text:
                    data_json_post = json.loads(text)
        except:
            print('[{} - {}] error de conexion error = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), data, traceback.format_exc()), flush=True)
            data_json_post = {'respuesta': 'error de conexion'}

    finally:
        return data_json_post


def paqueclaro(data):
    data_json_post = None
    try:
        try:
            req = urllib.request.Request(url='http://72.55.153.11:8087/siscompal/api/v1.0/recarga/', data=data, method='POST', headers={'Content-Type': 'application/json'})
            f = urllib.request.urlopen(req)
            if f.status == 200 and f.reason == 'OK':
                text = f.read().decode('utf8')
                if text:
                    data_json_post = json.loads(text)
        except:
            print('[{} - {}] error de conexion error = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), data, traceback.format_exc()), flush=True)
            data_json_post = {'respuesta': 'error de conexion'}

    finally:
        return data_json_post


def etb(data):
    data_json_post = None
    try:
        try:
            req = urllib.request.Request(url='http://72.55.153.11:8084/siscompal/api/v1.0/recarga/', data=data, method='POST', headers={'Content-Type': 'application/json'})
            f = urllib.request.urlopen(req)
            data_json_post = None
            if f.status == 200 and f.reason == 'OK':
                text = f.read().decode('utf8')
                if text:
                    data_json_post = json.loads(text)
        except:
            print('[{} - {}] error de conexion error = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), data, traceback.format_exc()), flush=True)
            data_json_post = {'respuesta': 'error de conexion'}

    finally:
        return data_json_post


def conexred(data):
    data_json_post = None
    try:
        try:
            req = urllib.request.Request(url='http://72.55.153.11:8083/siscompal/api/v1.0/recarga/', data=data, method='POST', headers={'Content-Type': 'application/json'})
            f = urllib.request.urlopen(req)
            if f.status == 200 and f.reason == 'OK':
                text = f.read().decode('utf8')
                if text:
                    data_json_post = json.loads(text)
        except:
            print('[{} - {}] error de conexion error = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), data, traceback.format_exc()), flush=True)
            data_json_post = {'respuesta': 'error de conexion'}

    finally:
        return data_json_post


def directv(data):
    data_json_post = None
    try:
        try:
            req = urllib.request.Request(url='http://72.55.153.11:8089/siscompal/api/v1.0/recarga/', data=data, method='POST', headers={'Content-Type': 'application/json'})
            f = urllib.request.urlopen(req)
            data_json_post = None
            if f.status == 200 and f.reason == 'OK':
                text = f.read().decode('utf8')
                if text:
                    data_json_post = json.loads(text)
        except:
            pass

    finally:
        return data_json_post


def lapartida(data):
    data_json_post = None
    try:
        try:
            req = urllib.request.Request(url='http://72.55.153.11:8079/siscompal/api/v1.0/recarga/', data=data, method='POST', headers={'Content-Type': 'application/json'})
            f = urllib.request.urlopen(req)
            if f.status == 200 and f.reason == 'OK':
                text = f.read().decode('utf8')
                if text:
                    data_json_post = json.loads(text)
        except:
            print('[{} - {}] error de conexion error = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), data, traceback.format_exc()), flush=True)
            data_json_post = {'respuesta': 'error de conexion'}

    finally:
        return data_json_post


def wplay(data):
    """
    data_json_post = None
    try:
        req = urllib.request.Request(url='http://72.55.153.11:8078/siscompal/api/v1.0/recarga/',
                                     data=data,
                                     method='POST',
                                     headers={'Content-Type': 'application/json'})
        f = urllib.request.urlopen(req)

        if f.status == 200 and f.reason == "OK":
            text = f.read().decode("utf8")
            if text:
                data_json_post = json.loads(text)
    except:
        print('[{} - {}] error de conexion error = {}'.format(
            datetime.now().strftime('%Y-%m-%d %H:%M:%S'), data, traceback.format_exc()), flush=True)
        data_json_post = {'respuesta': 'error de conexion'}
    finally:
        return data_json_post
    """
    return {'respuesta': 'error de conexion'}


def movilway(data):
    data_json_post = None
    try:
        try:
            req = urllib.request.Request(url='http://72.55.153.11:8082/siscompal/api/v1.0/recarga/', data=data, method='POST', headers={'Content-Type': 'application/json'})
            f = urllib.request.urlopen(req)
            if f.status == 200 and f.reason == 'OK':
                text = f.read().decode('utf8')
                if text:
                    data_json_post = json.loads(text)
        except:
            print('[{} - {}] error de conexion error = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), data, traceback.format_exc()), flush=True)
            data_json_post = {'respuesta': 'error de conexion'}

    finally:
        return data_json_post


def movilred(data):
    data_json_post = None
    try:
        try:
            req = urllib.request.Request(url='http://72.55.153.11:8090/siscompal/api/v1.0/recarga/', data=data, method='POST', headers={'Content-Type': 'application/json'})
            f = urllib.request.urlopen(req)
            data_json_post = None
            if f.status == 200 and f.reason == 'OK':
                text = f.read().decode('utf8')
                if text:
                    data_json_post = json.loads(text)
        except:
            print('[{} - {}] error de conexion error = {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), data, traceback.format_exc()), flush=True)
            data_json_post = {'respuesta': 'error de conexion'}

    finally:
        return data_json_post


def pregunta(data_json_post):
    if 'SALDO INSUFICIENTE' in str(data_json_post['respuesta']):
        return True
    else:
        if 'El mayorista no posee fondos suficientes para realizar la transaccion' in str(data_json_post['respuesta']):
            return True
        if '39-El stock de producto es insuficiente para realizar la venta.' in str(data_json_post['respuesta']):
            return True
        if 'EN MANTENIMIENTO' in str(data_json_post['respuesta']):
            return True
        return False


@app.task
def demonio_recargar(id_recarga, ip):
    with psql_db.atomic():
        rr = Recargas.get(Recargas.id == id_recarga)
        celular = rr.numero
        monto = rr.valor
        prr = rr.pro
        mv = Movimiento_saldo.get(Movimiento_saldo.rem == rr)
        sau = None
        for v in Saldo.select().where(Saldo.ust == rr.usr, Saldo.estado_sistema == 1).for_update(for_update=True):
            sau = v

        tus = rr.usr
        try:
            if prr.producto != '' and prr.producto == 'RECARGA':
                if str(prr.ope.operador).upper() == 'WPLAY':
                    rr.salida = 'wplay'
                    rr.save()
                    data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'id_s': '0e63f3dc842e4181a22050740d76badf',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                    data_json_post = lapartida(data)
                    print(data_json_post, flush=True)
                    if not data_json_post or 'Recarga exitosa' not in str(data_json_post['respuesta']):
                        db.rollback()
                        db.commit()
                        db.set_autocommit(autocommit=True)
                        rr.obs = '{} 4 {}'.format('SERVERWEB', str(data_json_post['respuesta']))
                        rr.estado = 0
                        rr.save()
                        print('[{}] respuesta 4 ocurrio un error al realizar la recarga {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), str(data_json_post['respuesta'])), flush=True)
                        return str(data_json_post['respuesta'])
            else:
                if str(prr.ope.operador).upper() == 'LAPARTIDA':
                    rr.salida = 'lapartida'
                    rr.save()
                    data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'id_s': '0e63f3dc842e4181a22050740d76badf',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                    data_json_post = lapartida(data)
                    print(data_json_post, flush=True)
                    if not data_json_post or 'Recarga exitosa' not in str(data_json_post['respuesta']):
                        psql_db.rollback()
                        psql_db.commit()
                        psql_db.set_autocommit(autocommit=True)
                        rr.obs = '{} 4 {}'.format('SERVERWEB', str(data_json_post['respuesta']))
                        rr.estado = 0
                        rr.save()
                        print('[{}] respuesta 4 ocurrio un error al realizar la recarga {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), str(data_json_post['respuesta'])), flush=True)
                        return str(data_json_post['respuesta'])
                else:
                    if str(prr.ope.operador).upper() == 'CLARO':
                        rr.salida = 'claro'
                        rr.save()
                        data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'id_s': '0e63f3dc842e4181a22050740d76badf',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                        data_json_post = claro(data)
                        print(data_json_post, flush=True)
                        if data_json_post:
                            if pregunta(data_json_post):
                                rr.salida = 'conexred'
                                rr.save()
                                data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo).upper(),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                data_json_post = conexred(data)
                                print(data_json_post, flush=True)
                        if data_json_post:
                            if pregunta(data_json_post):
                                rr.salida = 'movilway'
                                rr.save()
                                data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo).upper(),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                data_json_post = movilway(data)
                                print(data_json_post, flush=True)
                        if data_json_post:
                            if pregunta(data_json_post):
                                rr.salida = 'movilred'
                                rr.save()
                                data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                data_json_post = movilred(data)
                                print(data_json_post, flush=True)
                        if not data_json_post or 'Recarga exitosa' not in str(data_json_post['respuesta']):
                            sau.valor_saldo = sau.valor_saldo + monto
                            sau.save()
                            mv.delete()
                            rr.obs = '{0} 4 {1}'.format('SERVERWEB', str(data_json_post['respuesta']))
                            rr.estado = 0
                            rr.save()
                            print('[{0} - {1}] respuesta 4 ocurrio un error al realizar la recarga {1}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), ip, str(data_json_post['respuesta'])), flush=True)
                            return {'respuesta': str(data_json_post['respuesta'])}
                    else:
                        if str(prr.ope.real_operador).upper() == 'DIRECTV' or str(prr.ope.real_operador).upper() == 'EXITO':
                            if str(prr.ope.real_operador).upper() == 'DIRECTV' and tus.porcentage_user < 4.5:
                                rr.salida = 'directv'
                                rr.save()
                                data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo).upper(),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                data_json_post = directv(data)
                            else:
                                rr.salida = 'movilway'
                                rr.save()
                                data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo).upper(),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                data_json_post = movilway(data)
                        else:
                            if str(prr.ope.real_operador).upper() == 'ETB':
                                rr.salida = 'etb'
                                rr.save()
                                data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo).upper(),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                data_json_post = etb(data)
                            else:
                                if str(prr.ope.real_operador).upper() == 'TIGO':
                                    con = red_is.get('0')
                                    con = int(con.decode('utf-8'))
                                    lis_ver = rec_tigo['{}'.format(con)]
                                    url_ver = lis_ver[1]
                                    url_env = '{}{}/{}/fue/'.format(url_ver, celular, int(Decimal(str(monto))))
                                    rr.salida = lis_ver[0]
                                    rr.save()
                                    if max_pro == con:
                                        con = 0
                                    else:
                                        con += 1
                                    red_is.set('0', '{}'.format(con))
                                    req = urllib.request.Request(url=url_env, method='GET')
                                    f = urllib.request.urlopen(req)
                                    data_json_post = None
                                    if f.status == 200:
                                        if f.reason == 'OK':
                                            text = f.read().decode('utf8')
                                            if text:
                                                data_json_post = json.loads(text)
                                else:
                                    rr.salida = 'conexred'
                                    rr.save()
                                    data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo).upper(),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                    data_json_post = conexred(data)
                                print(data_json_post, flush=True)
                                if str(prr.ope.real_operador).upper() == 'DIRECTV' or str(prr.ope.real_operador).upper() == 'EXITO':
                                    if data_json_post:
                                        if str(prr.ope.real_operador).upper() == 'DIRECTV':
                                            if pregunta(data_json_post):
                                                if rr.salida == 'directv':
                                                    rr.salida = 'movilway'
                                                    data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo).upper(),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                                    data_json_post = movilway(data)
                                                else:
                                                    rr.salida = 'directv'
                                                    data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo).upper(),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                                    data_json_post = directv(data)
                                                rr.save()
                                                print(data_json_post, flush=True)
                                    if data_json_post:
                                        if pregunta(data_json_post):
                                            rr.salida = 'movilred'
                                            rr.save()
                                            data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                            data_json_post = movilred(data)
                                            print(data_json_post, flush=True)
                                elif str(prr.ope.real_operador).upper() == 'ETB':
                                    pass
                                if data_json_post:
                                    if pregunta(data_json_post):
                                        rr.salida = 'movilred'
                                        rr.save()
                                        data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                        data_json_post = movilred(data)
                                        print(data_json_post, flush=True)
                                    if data_json_post:
                                        if pregunta(data_json_post):
                                            rr.salida = 'movilway'
                                            rr.save()
                                            data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                            data_json_post = movilway(data)
                                            print(data_json_post, flush=True)
                                else:
                                    if data_json_post:
                                        if pregunta(data_json_post):
                                            rr.salida = 'movilway'
                                            rr.save()
                                            data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo).upper(),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                            data_json_post = movilway(data)
                                            print(data_json_post, flush=True)
                                        if data_json_post:
                                            if pregunta(data_json_post):
                                                rr.salida = 'movilred'
                                                rr.save()
                                                data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                                data_json_post = movilred(data)
                                                print(data_json_post, flush=True)
                                        if data_json_post is None or 'Recarga exitosa' not in str(data_json_post['respuesta']) and 'Venta Paquetigo Correcta' not in str(data_json_post['respuesta']):
                                            sau.valor_saldo = sau.valor_saldo + monto
                                            sau.save()
                                            mv.delete()
                                            rr.obs = '{0} 5 {1}'.format('SERVERWEB', str(data_json_post['respuesta']))
                                            rr.estado = 0
                                            rr.save()
                                            print('[{0} - {1}] respuesta 5 ocurrio un error al realizar la recarga {1}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), ip, str(data_json_post['respuesta'])), flush=True)
                                            return {'respuesta': str(data_json_post['respuesta'])}
                                    else:
                                        if 90 < int(prr.codigo) < 93:
                                            rr.salida = 'movilway'
                                            rr.save()
                                            data = json.dumps({'numero': str(celular),  'empresa': 'paqueclaro',  'operador': str(prr.codigo),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                            data_json_post = paqueclaro(data)
                                            print(data_json_post, flush=True)
                                            if not data_json_post or 'Recarga exitosa' not in str(data_json_post['respuesta']):
                                                psql_db.rollback()
                                                psql_db.commit()
                                                psql_db.set_autocommit(autocommit=True)
                                                rr.obs = '{} 7 {}'.format('SERVERWEB', str(data_json_post['respuesta']))
                                                rr.estado = 0
                                                rr.save()
                                                print('[{}] respuesta 7 ocurrio un error al realizar la recarga {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), str(data_json_post['respuesta'])), flush=True)
                                                return str(data_json_post['respuesta'])
                                        else:
                                            if 99 < int(prr.codigo) < 118:
                                                rr.salida = 'claro'
                                                rr.save()
                                                data = json.dumps({'numero': str(celular),  'empresa': 'paqueclaro',  'operador': str(prr.codigo),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                                data_json_post = paqueclaro(data)
                                                print(data_json_post, flush=True)
                                                if not data_json_post or 'Recarga exitosa' not in str(data_json_post['respuesta']):
                                                    psql_db.rollback()
                                                    psql_db.commit()
                                                    psql_db.set_autocommit(autocommit=True)
                                                    rr.obs = '{} 7 {}'.format('SERVERWEB', str(data_json_post['respuesta']))
                                                    rr.estado = 0
                                                    rr.save()
                                                    print('[{}] respuesta 7 ocurrio un error al realizar la recarga {}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), str(data_json_post['respuesta'])), flush=True)
                                                    return str(data_json_post['respuesta'])
                                            else:
                                                con = red_is.get('0')
                                                con = int(con.decode('utf-8'))
                                                lis_ver = paq_tigo['{}'.format(con)]
                                                url_ver = lis_ver[1]
                                                url_env = '{}{}/{}/fue/'.format(url_ver, celular, prr.codigo)
                                                rr.salida = lis_ver[0]
                                                rr.save()
                                                if max_pro == con:
                                                    con = 0
                                                else:
                                                    con += 1
                                                red_is.set('0', '{}'.format(con))
                                                req = urllib.request.Request(url=url_env, method='GET')
                                                f = urllib.request.urlopen(req)
                                                data_json_post = None
                                                if f.status == 200:
                                                    if f.reason == 'OK':
                                                        text = f.read().decode('utf8')
                                                        if text:
                                                            data_json_post = json.loads(text)
                                                print(data_json_post, flush=True)
                                                if data_json_post:
                                                    if pregunta(data_json_post):
                                                        rr.salida = 'movilway'
                                                        rr.save()
                                                        data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo).upper(),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                                        data_json_post = movilway(data)
                                                        print(data_json_post, flush=True)
                                                if data_json_post:
                                                    if pregunta(data_json_post):
                                                        rr.salida = 'movilred'
                                                        rr.save()
                                                        data = json.dumps({'numero': str(celular),  'monto': str(monto),  'empresa': rr.salida,  'operador': str(prr.codigo),  'id_s': '0e63f3dc842e4181a22050740d76badf/',  'generacion_x': 'ec6bdfc7a5c74a34b15a3687678c4d57'}).encode('utf8')
                                                        data_json_post = movilred(data)
                                                        print(data_json_post, flush=True)
                                                if data_json_post is None or 'Recarga exitosa' not in str(data_json_post['respuesta']) and 'Venta Paquetigo Correcta' not in str(data_json_post['respuesta']):
                                                    sau.valor_saldo = sau.valor_saldo + monto
                                                    sau.save()
                                                    mv.delete()
                                                    rr.obs = '{0} 6 {1}'.format('SERVERWEB', str(data_json_post['respuesta']))
                                                    rr.estado = 0
                                                    rr.save()
                                                    print('[{0} - {1}] respuesta 6 ocurrio un error al realizar la recarga {1}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), ip, str(data_json_post['respuesta'])), flush=True)
                                                    return {'respuesta': str(data_json_post['respuesta'])}
        except:
            sau.valor_saldo = sau.valor_saldo + monto
            sau.save()
            mv.delete()
            rr.obs = 'SERVERWEB ERROR DE CONEXION'
            rr.estado = 0
            rr.save()
            print('[{0} - {1}] error de conexion error = {2}'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), ip, traceback.format_exc()), flush=True)
            return {'respuesta': 'error de conexion'}

        rr.estado = 1
        rr.save()
        hoy = datetime.now()
        fln = 'con_fil/{0}_{1}'.format(ip, hoy.strftime('%Y%m%d'))
        lac = open(str(fln) + '.txt', 'ab')
        mnj = '|%s|%s|%s|%s|%s|%s|\n' % (rr.id, hoy.strftime('%Y%m%d%H%M%S'), str(prr.ope.operador).upper(),
         str(prr.producto).upper(), celular, monto)
        lac.write(bytes(mnj, 'UTF-8'))
        lac.close()
        sal_do = str(locale.format('%d', sau.valor_saldo, True))
        print('[{0} - {1}] respuesta ok, saldo={2}'.format(datetime.now(), ip, sal_do), flush=True)
        try:
            psql_db.close()
            psql_db.close_all()
        except:
            try:
                print('[{}] DEUDA - [{}]'.format(datetime.now(), traceback.format_exc()), flush=True)
            except:
                pass

        return {'respuesta': 'Recarga exitosa',  'saldo': sal_do}
# okay decompiling demonio.pyc