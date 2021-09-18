import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-categoria-lista',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.css']
})
export class CategoriaListaComponent implements OnInit {
  
  public listaCategoria: Categoria[] = []  

  constructor(private service: CategoriaService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (categorias) => this.listaCategoria = categorias,
      (error) => alert('Erro ao carregar a lisa')
    )
  }

  deleteCategoria(categoria: Categoria): any{

    const mustDelete = confirm("Deseja realmente excluir este item?")

    if(mustDelete){
      return this.service.delete(categoria.id).subscribe(
        () => this.listaCategoria = this.listaCategoria.filter(element => element != categoria),
        () => alert('Erro ao tentar excluir')       
      )      
    } 
  }
}
