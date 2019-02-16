import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProductsResolver } from './products-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: ':id',
    component: ProductDetailComponent,
    resolve: { resolvedData: ProductsResolver }
  },
  {
    path: ':id/edit',
    component: ProductEditComponent,
    canDeactivate: [ProductEditGuard],
    resolve: { resolvedData: ProductsResolver },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'info' },
      { path: 'info', component: ProductEditInfoComponent },
      { path: 'tags', component: ProductEditTagsComponent }
    ]
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ]
})
export class ProductModule {}
