import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ase-home',
  templateUrl: './ase-home.component.html',
  styleUrls: ['./ase-home.component.css']
})
export class AseHomeComponent implements OnInit {

  public registerForm: FormGroup;
  public num: string;
  public iccid: string;
  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      num: [this.num, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
        ]],
      iccid: [this.iccid, [
        Validators.required,
        Validators.min(0)
        ]]
    });
  }

  onSubmit() {

  }

}
