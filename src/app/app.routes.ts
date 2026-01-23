import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';

export const routes: Routes = [
    {path: "", component: ProductsComponent},
    {path: "productos", component: ProductsComponent},
    {path: "acerca", component:AboutComponent},
    {path: "**", component: NoEncontradoComponent}
];
