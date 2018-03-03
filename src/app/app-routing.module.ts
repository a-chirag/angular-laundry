import { AddClientComponent } from './add-client/add-client.component';
import { AddClothComponent } from './add-cloth/add-cloth.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ClientsDetailsComponent } from './clients-details/clients-details.component';
import { ClientsComponent } from './clients/clients.component';
import { ClothesDetailsComponent } from './clothes-details/clothes-details.component';
import { ClothesComponent } from './clothes/clothes.component';
import { CompanyComponent } from './company/company.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders/orders.component';
import { PendingDeliveryComponent } from './pending-delivery/pending-delivery.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';

const routes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: 'clients/:id', component: ClientsDetailsComponent },
  { path: 'clothes/:id', component: ClothesDetailsComponent },
  { path: 'clients', component: ClientsComponent},
  { path: 'clothes', component: ClothesComponent},
  { path: 'addOrder', component: AddOrderComponent},
  { path: 'addClient', component: AddClientComponent},
  { path: 'addCloth', component: AddClothComponent},
  { path: 'settings', component: CompanyComponent},
  { path: 'pendingOrders', component: PendingOrdersComponent},
  { path: 'pendingDelivery', component: PendingDeliveryComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
