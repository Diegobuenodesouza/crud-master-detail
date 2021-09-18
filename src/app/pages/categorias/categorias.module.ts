import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
    CategoriasRoutingModule,    
  ]
})
export class CategoriasModule { }
