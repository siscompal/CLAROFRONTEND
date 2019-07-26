import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Activation } from '../../../../../models/activation';
import { ActivationService } from '../../../../../services/activation.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { EditarSimComponent } from '../../sim/editar-sim/editar-sim.component';
import { ActivarSimComponent } from '../../sim/activar-sim/activar-sim.component';


@Component({
  selector: 'app-publi-home',
  templateUrl: './publi-home.component.html',
  styleUrls: ['./publi-home.component.css']
})
export class PubliHomeComponent implements OnInit {

  public activation: Activation;
  public registerForm: FormGroup;

  public listData: MatTableDataSource<any>;
  public displayedColumns: string[] = ['numero', 'iccid', 'id_pdv', 'acciones'];
  public searchKey: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private activationService: ActivationService,
    private dialog: MatDialog
  ) { 
    this.activation = new Activation("","","162255");
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      numero: [this.activation.numero, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
        ]],
      iccid: [this.activation.iccid, [
        Validators.required
        ]],
      id_pdv: [this.activation.id_pdv, [
        Validators.required,
        ]]
    });
    
    this.activationService.getSims().subscribe(
      list => {
        const array = list['sims'];
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    )

  }

  onSubmit() {
    this.activationService.registro(this.activation).subscribe(
      response => {
        if(response) {
          this.notificationService.success("Registro exitoso");
          this.activation = new Activation("","","162255");
        }
      },
      error => {
        this.notificationService.warn("Sim existente");
        this.activation = new Activation("","","162255");
      }
    )
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(activate: Activation, id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.data = {sim: activate, id: id}; 
    this.dialog.open(EditarSimComponent, dialogConfig);
  }

  Activate(sim: Activation, id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {sim: sim, id: id}; 
    this.dialog.open(ActivarSimComponent, dialogConfig);
  }
}
