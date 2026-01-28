import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, switchMap, tap } from 'rxjs';
import { Producto } from '../../models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly apiUrl = "http://localhost:8080/api/productos";
  private datos$: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);

  constructor(private httpClient: HttpClient) {
    this.obtenerDatos().subscribe();
  }

  obtenerDatos() : Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.apiUrl).pipe(
      tap(res => this.datos$.next(res))
    );
  }

  addProductos(producto : Producto){
    this.httpClient.post<Producto>(this.apiUrl, producto).pipe(
      tap( () =>{
        this.obtenerDatos().subscribe();
      })
    );
  }

  modificarProducto(id: number, producto:Producto){
    let urlEdit = `${this.apiUrl}/${id}`;
    this.httpClient.put(urlEdit, producto).pipe(
      tap( () => {
        this.obtenerDatos().subscribe();
      })
    );
  }

  eliminarProductos(id:number){
    let eliminarUrl = `${this.apiUrl}/${id}`;
    this.httpClient.delete(this.apiUrl).pipe(
      tap( ()=> {
        this.obtenerDatos().subscribe();
      })
    );
  }

  get getDatos(){
    return this.datos$.asObservable();
  }

}
