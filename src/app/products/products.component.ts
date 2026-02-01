import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faPen, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Producto } from '../models/Producto.model';
import { ProductoService } from '../service/productos/producto.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  addIcon = faPlus;
  editIcon = faPen;
  deleteIcon = faTrash;
  warningIcon = faTriangleExclamation;
  p: number = 1;
  id!: number;
  toggle: boolean = false;
  toggleDelete: boolean = false;
  errorFlag: boolean = false;
  datos$: Observable<Producto[]>;

  constructor(private productoService: ProductoService) {
    this.datos$ = productoService.getDatos;
  }

  productForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(45), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-_.]+$/)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255), Validators.pattern(/^[^<>]*$/)]),
    existencia: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100000)])
  });

  toggleModal(): void {
    this.toggle = !this.toggle;
  }

  openEditModal(id: number) {
    this.toggleModal();
    let producto: Producto;
    this.productoService.encontrarPorId(id).pipe(
      tap((res) => producto = res),
      tap(() => {
        this.productForm.setValue({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          existencia: producto.existencia
        });
        this.id = producto.id ?? 0;
      })
    ).subscribe({
      next: () => console.log("Producto encontrado"),
      error: err => console.error(err)
    });
  }

  openDeleteModal(id: number){
    this.toggleDelete = !this.toggleDelete;
    this.id = id;
  }

  limpiarFormulario() {
    this.productForm.reset();
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    this.productForm.updateValueAndValidity();
  }

  enviarDatos() {
    if (this.productForm.valid) {
      this.errorFlag = false;
      let producto: Producto = {
        nombre: this.productForm.value.nombre ?? '',
        descripcion: this.productForm.value.descripcion ?? '',
        existencia: this.productForm.value.existencia ?? 0
      }

      if(this.id > 0 && !this.productForm.dirty){
        console.log("No se modifico nada");
        this.toggleModal();
        this.limpiarFormulario();
        return;
      }

      if (this.id > 0) {
        this.productoService.modificarProducto(this.id, producto).subscribe({
          next: () => console.log("Producto modificado"),
          error: err => console.error(err)
        });
      } else {
        this.productoService.addProductos(producto).subscribe({
          next: () => console.log("Producto agregado"),
          error: err => console.error(err)
        });
      }

      this.limpiarFormulario();
      this.toggleModal();
    }else{
      this.errorFlag = true;
      console.log("entro al error")
    }
  }

  eliminarProducto(){
    this.productoService.eliminarProductos(this.id).subscribe({
      next: ()=> console.log("Producto eliminado"),
      error: err => console.error(err)
    });

    this.limpiarFormulario();
    this.toggleDelete = false;
  }

  cancelOpcion() {
    this.toggleModal();
    this.limpiarFormulario();
    this.errorFlag = false;
    console.log("Formulario cancelado");
  }



}

