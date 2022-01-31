import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppBodyTypeComponent } from './body-types/body-types.component';
import { AppBrandsComponent } from './brands/brands.component';
import { AppCarItemComponent } from './car-item/car-item.component';
import { AppHomepageComponent } from './homepage.component';
import { AppPopularComponent } from './popular/popular.component';
import { AppTabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    component: AppHomepageComponent
  }
];

@NgModule({
  declarations: [
    AppHomepageComponent,
    AppCarItemComponent,
    AppTabsComponent,
    AppBodyTypeComponent,
    AppPopularComponent,
    AppBrandsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    AppHomepageComponent,
    AppCarItemComponent,
    AppTabsComponent,
    AppBodyTypeComponent,
    AppPopularComponent,
    AppBrandsComponent
  ]
})

export class HomepageModule {
}
