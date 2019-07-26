import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Activated } from 'src/app/models/activation';
import { ActivationService } from '../../../../../services/activation.service';

@Component({
  selector: 'app-activar-sim',
  templateUrl: './activar-sim.component.html',
  styleUrls: ['./activar-sim.component.css']
})
export class ActivarSimComponent implements OnInit {

  public activacion: Activated;

  public registerForm: FormGroup;

  constructor(
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ActivarSimComponent>,
    private formBuilder: FormBuilder,
    private activationService: ActivationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.activacion = new Activated("","","","","","","");
   }

  ngOnInit() {
    let sim = this.data.sim;
    this.activacion.numero = sim.numero;
    this.activacion.iccid = sim.iccid;
    this.activacion.id_pdv = sim.id_pdv;
    this.activacion._id = this.data.id;
    this.activacion.nombre = "";
    this.activacion.documento = "";
    this.activacion.direccion = "";

    this.registerForm = this.formBuilder.group({
      nombre: [this.activacion.nombre, [
        Validators.required,
        ]],
      documento: [this.activacion.documento, [
        Validators.required,
        ]],
      direccion: [this.activacion.direccion, [
        Validators.required,
        ]],
      numero: [this.activacion.numero, [
        Validators.required,
        ]],
      iccid: [this.activacion.iccid, [
        Validators.required,
        ]],
        id_pdv: [this.activacion.id_pdv, [
        Validators.required,
        ]],
    });
  }

  onSubmit() {
    this.activationService.activateSim(this.activacion).subscribe(
      response => {
        if(response) {
          this.notificationService.success("Solicitud de activación enviada");
          this.dialogRef.close();
        }
      },
      error => {
        this.notificationService.warn("Error al enviar solicitud");
        this.dialogRef.close();
      }
    )
  }

}
