import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { Activation } from '../../../../../models/activation';
import { ActivationService } from '../../../../../services/activation.service';

@Component({
  selector: 'app-editar-sim',
  templateUrl: './editar-sim.component.html',
  styleUrls: ['./editar-sim.component.css']
})
export class EditarSimComponent implements OnInit {

public sim: Activation;
public editForm: FormGroup;

  constructor(
    private notificationService: NotificationService,
    private activationService: ActivationService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditarSimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Activation
  ) {
    this.sim = new Activation("","","162255");
   }

  ngOnInit() {

    this.sim = this.data['sim'];
    this.editForm = this.formBuilder.group({
      numero: [this.sim.numero, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
        ]],
      iccid: [this.sim.iccid, [
        Validators.required
        ]],
      id_pdv: [this.sim.id_pdv, [
        Validators.required,
        ]]
    });
    console.log(this.sim);
  }

  onSubmit() {
    this.activationService.updateSim(this.sim, this.data['id']).subscribe(
      response => {
        if(response) {
          this.notificationService.success("Sim actualizada correctamente");
          this.sim = new Activation("","","162255");
          this.dialogRef.close();
        }
      },
      error => {
        this.notificationService.warn("No se pudo actualizar la sim");
        this.sim = new Activation("","","162255");
        this.dialogRef.close();
      }
    )
  }

}
