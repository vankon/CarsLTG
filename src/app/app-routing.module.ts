import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from './buy/buy.component';
import { ContactComponent } from './contact/contact.component';
import { MarketComponent } from './market/market.component';
import { SellComponent } from './sell/sell.component';

export const routes: Routes = [
  { path: 'home', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
  { path: 'sell', component: SellComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'market', component: MarketComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
