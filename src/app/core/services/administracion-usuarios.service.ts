
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartamentosRequest } from '../model/departamentos';
import { CargosRequest } from '../model/cargos';
import { UsersRequest } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class AdministracionUsuariosService {

  private apiConfig = 'http://administracion-usuario.test:8080/api';

  constructor(private _http: HttpClient) { }

  findAllDepartamentos(): Observable<DepartamentosRequest[]> {
    return this._http.get<DepartamentosRequest[]>(this.apiConfig.concat('/list-departamentos'));
  }

  findAllCargos(): Observable<CargosRequest[]> {
    return this._http.get<CargosRequest[]>(this.apiConfig.concat('/list-cargos'));
  }

  findAllUsers(): Observable<UsersRequest[]> {
    return this._http.get<UsersRequest[]>(this.apiConfig.concat('/users'));
  }

  createUsers(requestCreateUsers: UsersRequest) {
    return this._http.post(this.apiConfig.concat('/users'), requestCreateUsers);
  }

  updateUsers(requestUpdateUsers: UsersRequest, id: number) {
    return this._http.put(this.apiConfig.concat(`/users/${id}`), requestUpdateUsers);
  }

  destroyUsers(id: number) {
    return this._http.delete(this.apiConfig.concat('/users/' + id));
  }
}
