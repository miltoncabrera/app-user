import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionUsuariosComponent } from './core/component/administracion-usuarios/administracion-usuarios.component';
import { HeaderComponent } from './core/component/header/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AdministracionUsuariosEditComponent } from './core/component/administracion-usuarios-edit/administracion-usuarios-edit.component';

const routes: Routes = [
  { path: '', component: AdministracionUsuariosComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    AdministracionUsuariosComponent,
    HeaderComponent,
    AdministracionUsuariosEditComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserAnimationsModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
