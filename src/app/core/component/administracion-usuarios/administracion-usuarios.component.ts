import { Component, ViewChild } from '@angular/core';
import { UsersRequest } from '../../model/users';
import { AdministracionUsuariosService } from '../../services/administracion-usuarios.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CargosRequest } from '../../model/cargos';
import { DepartamentosRequest } from '../../model/departamentos';
import { FormControl, Validators } from '@angular/forms';
import { AdministracionUsuariosEditComponent } from '../administracion-usuarios-edit/administracion-usuarios-edit.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-administracion-usuarios',
  templateUrl: './administracion-usuarios.component.html',
  styleUrls: ['./administracion-usuarios.component.css']
})
export class AdministracionUsuariosComponent {

  displayedColumns: string[] = ['usuario', 'nombres', 'apellidos', 'departamentos', 'cargo', 'email', 'accion'];
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSor!: MatSort;
  matTableDataSourceUser!: MatTableDataSource<UsersRequest>;
  selectDepartamento?: string;
  selectCargo?: string;

  departamentosControl = new FormControl<DepartamentosRequest | null>(null, Validators.required);
  cargosControl = new FormControl<CargosRequest | null>(null, Validators.required);

  departamentoRequest: DepartamentosRequest[] = [];
  cargoRequest: CargosRequest[] = [];

  constructor(private _administracionService: AdministracionUsuariosService
    , public dialog: MatDialog) {
    this.processToObtainDepartamentos();
    this.processToObtainCargos();
    this.processToObtainUsers();
  }

  processToObtainUsers() {
    this._administracionService.findAllUsers().subscribe({
      next: (responseUsers) => {
        if (responseUsers) {

          responseUsers.forEach((response) => {
            const descripcionDepartamento = this.departamentoRequest.find(departamento => departamento.id === response.idDepartamento)?.nombre;
            const descripcionCargo = this.cargoRequest.find(cargo => cargo.id === response.idCargo)?.nombre;
            response.descripcionDepartamento = descripcionDepartamento;
            response.descripcionCargo = descripcionCargo;

          })

          this.matTableDataSourceUser = new MatTableDataSource(responseUsers);
          this.matTableDataSourceUser.sort = this.matSor;
          this.matTableDataSourceUser.paginator = this.paginator;
        }

      }, error: console.error,
    });
  }

  processToDestroyUsers(id: number) {
    this._administracionService.destroyUsers(id).subscribe({
      next: (responseDestroy) => {
        alert('Usuario Eliminado correctamente');
        this.processToObtainUsers();
      }, error: console.error,
    });
  }

  processToObtainDepartamentos() {
    this._administracionService.findAllDepartamentos().subscribe({
      next: (responseDepartamento) => {
        if (responseDepartamento)
          this.departamentoRequest = responseDepartamento;
      }
    });
  }

  processToObtainCargos() {
    this._administracionService.findAllCargos().subscribe({
      next: (responseCargos) => {
        if (responseCargos)
          this.cargoRequest = responseCargos;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AdministracionUsuariosEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.processToObtainUsers();
        }
      }
    });
  }

  openEditUsers(data: any) {
    const dialogRef = this.dialog.open(AdministracionUsuariosEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.processToObtainUsers();
        }
      }
    });
  }

}
