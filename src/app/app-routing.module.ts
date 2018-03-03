import { AddClientComponent } from './add-client/add-client.component';
import { AddClothComponent } from './add-cloth/add-cloth.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ClientsDetailsComponent } from './clients-details/clients-details.component';
import { ClientsComponent } from './clients/clients.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders/orders.component';

const routes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: 'clients/:id', component: ClientsDetailsComponent },
  { path: 'clients', component: ClientsComponent},
  { path: 'addOrder', component: AddOrderComponent},
  { path: 'addClient', component: AddClientComponent},
  { path: 'addCloth', component: AddClothComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
