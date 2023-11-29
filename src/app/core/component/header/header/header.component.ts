import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdministracionUsuariosService } from '../../../services/administracion-usuarios.service';
import { DepartamentosRequest } from 'src/app/core/model/departamentos';
import { CargosRequest } from 'src/app/core/model/cargos';
import { MatDialog } from '@angular/material/dialog';
import { AdministracionUsuariosEditComponent } from '../../administracion-usuarios-edit/administracion-usuarios-edit.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {



  constructor(private _administracionService: AdministracionUsuariosService
    , public dialog: MatDialog) {
 
  }


}
