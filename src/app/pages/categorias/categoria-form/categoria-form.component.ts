import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { skip } from 'rxjs/operators';

import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit, AfterContentChecked {

  currentAction?: string;
  categoriaForm: FormGroup= new FormGroup({})
  pageTitle?: string;
  submitForm: boolean = false;
  categoria!: Categoria;
  textBtn = 'Cadastrar'

  constructor(
    private categoriaService: CategoriaService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.setCrrentAction()
    this.buildCategoriaForm(),
    this.loadCategoria();  
  
  }

  ngAfterContentChecked(): void {
    this.setPageTitle()   
  }

  submitCategoria(){
    this.submitForm = true;
    if(this.currentAction == 'new')
      this.crateCategoria();
    else{
      this.updateCategoria();
    }
  }

  // Metodos Privados

  private setCrrentAction(): void{
    this.currentAction = this.activateRoute.snapshot.routeConfig?.path === 'new'? 'new' : 'edit'    
  }
  
  private buildCategoriaForm(): void{    
    this.categoriaForm = this.fb.group({
      id: null,
      nome: [null,[Validators.required, Validators.minLength(3)]],
      descricao: null
    })
  }

  private loadCategoria(){
    if(this.currentAction === 'edit'){
      this.activateRoute.paramMap.subscribe(
        params => {
          this.categoriaService.getById(Number(params.get('id'))).subscribe(
            categoria => {
              this.categoria = categoria
              this.categoriaForm.patchValue(categoria)
            },
            () => alert("Ocorreu um erro no servidor, tente mais tarde.")
          )        
        }
      )
    }
  }

  private setPageTitle(): void{
    if( this.currentAction === 'new'){
      this.textBtn = 'Cadastrar'
      this.pageTitle = 'Cadastro de Nova Categoria'      
    }
    else {
      const categoriaNome = this.categoria?.nome || '';
      this.textBtn = 'Editar'
      this.pageTitle = `Editando a categoria ${categoriaNome}`
    }
  }

  private crateCategoria(): void{
    const categoria: Categoria = Object.assign(this.categoriaForm.value)
    this.categoriaService.create(categoria).subscribe(
      categoria => this.actionsForSucess(categoria),
      error => this.actionForError(error)
    )
    // this.categoriaService.create
  }

  private updateCategoria(){
    const categoria: Categoria = Object.assign(this.categoriaForm.value)
    this.categoriaService.update(categoria).subscribe(
      categoria => this.actionsForSucess(categoria),
      error => this.actionForError(error)
    )
  }

  private actionsForSucess(categoria: Categoria){
    this.showSuccess("cadastrada");
    this.router.navigate(["/" , categoria.id, 'edit'])
  }

  private actionForError(error: Error){
    this.toastr.error("Ocorreu um erro ao processar a sua solicitação " + error.message)
    this.submitForm = false

  }

  showSuccess(string: String) {
    this.toastr.success(`Categoria ${string} com sucesso`);
  }


  
}
