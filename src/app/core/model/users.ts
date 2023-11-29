export interface UsersRequest {
  id?: number;
  usuario: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  idDepartamento: number;
  idCargo: number;
  descripcionDepartamento?: string;
  descripcionCargo?: string;

}
