import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public showFiller: boolean;
  public menu: Array<string>;
  constructor() { }

  ngOnInit() {
    this.showFiller = true;
    this.menu = ['Home',
    'Crear usuario',
    'listado usuarios',
     'Crear clientes',
     'listado clientes',
     'Crear producto',
    'listado producto',
  ]
  }

}
