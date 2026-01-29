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

  obtenerDatos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.apiUrl).pipe(
      tap(res => this.datos$.next(res))
    );
  };

  addProductos(producto: Producto): Observable<Producto[]> {
    return this.httpClient.post<Producto>(this.apiUrl, producto).pipe(
      switchMap(()=> this.obtenerDatos())
    );
  }

  modificarProducto(id: number, producto: Producto) : Observable<Producto[]> {
    let urlEdit = `${this.apiUrl}/${id}`;
    return this.httpClient.put(urlEdit, producto).pipe(
      switchMap(()=> this.obtenerDatos())
    );
  }

  eliminarProductos(id: number) : Observable<Producto[]> {
    let eliminarUrl = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(eliminarUrl).pipe(
      switchMap(()=> this.obtenerDatos())
    );
  }

  encontrarPorId(id: number) : Observable<Producto>{
    let foundUrl = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Producto>(foundUrl);
  }

  get getDatos() {
    return this.datos$.asObservable();
  }

}
