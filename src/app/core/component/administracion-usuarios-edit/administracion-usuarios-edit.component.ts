import { Component, OnInit, Inject } from '@angular/core';
import { AdministracionUsuariosService } from '../../services/administracion-usuarios.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersRequest } from '../../model/users';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CargosRequest } from '../../model/cargos';
import { DepartamentosRequest } from '../../model/departamentos';

@Component({
  selector: 'app-administracion-usuarios-edit',
  templateUrl: './administracion-usuarios-edit.component.html',
  styleUrls: ['./administracion-usuarios-edit.component.css']
})
export class AdministracionUsuariosEditComponent implements OnInit {

  formularioUsers: FormGroup;
  departamentoRequest: DepartamentosRequest[] = [];
  cargoRequest: CargosRequest[] = [];


  constructor(private _administracionService: AdministracionUsuariosService,
    private _fb: FormBuilder,
    private _dialofRef: MatDialogRef<AdministracionUsuariosEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.formularioUsers = this._fb.group({
      fbUsuario: [{ value: "", disabled: false }],
      fbEmail: [{ value: "", disabled: false }],
      fbPrimerNombre: [{ value: "", disabled: false }],
      fbSegundNombre: [{ value: "", disabled: false }],
      fbPrimerApellido: [{ value: "", disabled: false }],
      fbSegundoApellido: [{ value: "", disabled: false }],
      fbIdDepartamento: [{ value: "", disabled: false }],
      fbIdCargo: [{ value: "", disabled: false }]

    });

  }


  ngOnInit(): void {
    this.processToObtainDepartamentos();
    this.processToObtainCargos();
    if (this.data) {

      this.formularioUsers.get('fbUsuario')?.setValue(this.data.usuario);
      this.formularioUsers.get('fbEmail')?.setValue(this.data.email);
      this.formularioUsers.get('fbPrimerNombre')?.setValue(this.data.primerNombre);
      this.formularioUsers.get('fbSegundNombre')?.setValue(this.data.segundoNombre);
      this.formularioUsers.get('fbPrimerApellido')?.setValue(this.data.primerApellido);
      this.formularioUsers.get('fbSegundoApellido')?.setValue(this.data.segundoApellido);
      this.formularioUsers.get('fbIdDepartamento')?.setValue(this.data.idDepartamento);
      this.formularioUsers.get('fbIdCargo')?.setValue(this.data.idCargo);
    }
  }

  processInsertUsers() {


    if (this.formularioUsers.valid){

      const userRequest: UsersRequest = {
        usuario: this.formularioUsers.get('fbUsuario')?.value,
        primerNombre: this.formularioUsers.get('fbPrimerNombre')?.value,
        segundoNombre: this.formularioUsers.get('fbSegundNombre')?.value,
        primerApellido: this.formularioUsers.get('fbPrimerApellido')?.value,
        segundoApellido: this.formularioUsers.get('fbSegundoApellido')?.value,
        idDepartamento: this.formularioUsers.get('fbIdDepartamento')?.value,
        idCargo: this.formularioUsers.get('fbIdCargo')?.value
      }


      if(this.data){
        console.log(this.data);
        alert();
        console.log(this.formularioUsers.value);
        this._administracionService.updateUsers(userRequest, this.data.id).subscribe({
          next: (responseUser) => {
            this._dialofRef.close(true);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }else{

        this._administracionService.createUsers(userRequest).subscribe({
          next: (responseUser) => {
            this._dialofRef.close(true);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }

    }


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

}
