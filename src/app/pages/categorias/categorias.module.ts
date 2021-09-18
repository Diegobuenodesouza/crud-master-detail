import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { CategoriasRoutingModule } from './categorias-routing.module';

@NgModule({
  declarations: [
    CategoriaListaComponent,
    CategoriaFormComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CategoriasRoutingModule,   
    ReactiveFormsModule 
  ]
})
export class CategoriasModule { }
