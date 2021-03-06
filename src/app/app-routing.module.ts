import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddClothComponent } from './add-cloth/add-cloth.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AuthGuardService } from './auth-guard.service';
import { ClientsDetailsComponent } from './clients-details/clients-details.component';
import { ClientsComponent } from './clients/clients.component';
import { ClothesDetailsComponent } from './clothes-details/clothes-details.component';
import { ClothesComponent } from './clothes/clothes.component';
import { CompanyComponent } from './company/company.component';
import { LoginComponent } from './login/login.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './orders/orders.component';
import { PendingDeliveryComponent } from './pending-delivery/pending-delivery.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { UnpaidOrderComponent } from './unpaid-order/unpaid-order.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService] },
  { path: 'orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuardService]  },
  { path: 'clients/:id', component: ClientsDetailsComponent, canActivate: [AuthGuardService]  },
  { path: 'clothes/:id', component: ClothesDetailsComponent, canActivate: [AuthGuardService]  },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuardService] },
  { path: 'clothes', component: ClothesComponent, canActivate: [AuthGuardService] },
  { path: 'addOrder', component: AddOrderComponent, canActivate: [AuthGuardService] },
  { path: 'addOrder/:id', component: AddOrderComponent, canActivate: [AuthGuardService] },
  { path: 'addClient', component: AddClientComponent, canActivate: [AuthGuardService] },
  { path: 'addCloth', component: AddClothComponent, canActivate: [AuthGuardService] },
  { path: 'settings', component: CompanyComponent, canActivate: [AuthGuardService] },
  { path: 'pendingOrders', component: PendingOrdersComponent, canActivate: [AuthGuardService] },
  { path: 'pendingDelivery', component: PendingDeliveryComponent, canActivate: [AuthGuardService] },
  { path: 'unpaid', component: UnpaidOrderComponent, canActivate: [AuthGuardService] },
  { path: '', component: PendingDeliveryComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent},
  { path: 'access', component: AccessDeniedComponent},
  { path: 'addUser', component: AddUserComponent, canActivate: [AuthGuardService]},
  { path: 'manageUser', component: UserDetailsComponent, canActivate: [AuthGuardService]}
];
const config: ExtraOptions = {
  useHash: true,
};
@NgModule({
  imports: [RouterModule.forRoot(routes,config)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
