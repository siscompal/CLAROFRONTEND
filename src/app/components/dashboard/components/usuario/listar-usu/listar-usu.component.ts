import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { User } from 'src/app/models/user';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-listar-usu',
  templateUrl: './listar-usu.component.html',
  styleUrls: ['./listar-usu.component.css']
})
export class ListarUsuComponent implements OnInit {
  constructor() { }

  ngOnInit() {

  }


}
