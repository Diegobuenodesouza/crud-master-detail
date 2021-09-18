import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
  serverErrorMessages: string[] = [];
  submitForm: boolean = false;
  categoria?: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.setCrrentAction()
    this.buildCategoriaForm(),
    this.loadCategoria();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  // Metodos Privados

  setCrrentAction(): void{
    this.currentAction = this.activateRoute.snapshot.routeConfig?.path === 'new'? 'new' : 'edit'    
  }
  
  buildCategoriaForm(): void{    
    this.categoriaForm = this.fb.group({
      id: null,
      nome: [null,[Validators.required, Validators.minLength(3)]],
      descricao: null
    })
  }

  loadCategoria(){
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

  setPageTitle(): void{
    if( this.currentAction === 'new')
      this.pageTitle = 'Cadastro de Nova Categoria'
    else{
      const categoriaNome = this.categoria?.nome || '';
      this.pageTitle = `Editando a categoria ${categoriaNome}`
    }
  }

  
  
}
