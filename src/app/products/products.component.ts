import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Producto } from '../models/Producto.model';
import { ProductoService } from '../service/productos/producto.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  addIcon = faPlus;
  editIcon = faPen;
  deleteIcon = faTrash;
  toggle: boolean = false;
  datos$ : Observable<Producto[]>;

  constructor(private productoService: ProductoService){
    this.datos$ = productoService.getDatos;
  }

  addProducto(){
    
  }

  openModal(): void{
    this.toggle = !this.toggle;
  }
}
