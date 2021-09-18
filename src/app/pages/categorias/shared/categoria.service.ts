import { HttpClient , HttpHeaders, JsonpClientBackend} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap} from "rxjs/operators"

import { Categoria} from "./categoria.model"

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiPath: string = 'http://localhost:3000/categorias'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.apiPath).pipe(
      catchError(this.handleErro),
      map(this.jsonDataToCategorias)
    )
  }

  getById(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleErro),
      map(this.jsonDataToCategoria)
    )
  }

  create(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.apiPath, categoria).pipe(
      catchError(this.handleErro),
      map(this.jsonDataToCategoria)
    )
  }

  update(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>(`${this.apiPath}/${categoria.id}` , categoria).pipe(
      catchError(this.handleErro),
      map(() => categoria)
    )
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleErro),
      map(() => null)
    )
  }
  
  // Métodos privados

  private jsonDataToCategorias(jsonData: any[]): Categoria[]{
    const categorias: Categoria[] = [];
    jsonData.forEach(element => categorias.push(this.jsonDataToCategoria(element)));
    return categorias;
  }

  private jsonDataToCategoria(jsonData: any): Categoria{
    return jsonData as Categoria
  }

  private handleErro(error: any): Observable<any>{
    console.log("Erro na requisição =>", error)
    return throwError(error);
  }
  



}
