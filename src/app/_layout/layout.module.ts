import { NgModule } from '@angular/core';
import { AppBaseLayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './header/header.component';
import { AppFooterComponent } from './footer/footer.component';
import { AppNavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppBaseLayoutComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppNavbarComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    AppBaseLayoutComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppNavbarComponent
  ]
})

export class LayoutModule {
}
