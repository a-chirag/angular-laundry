import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AppRoutingModule } from './/app-routing.module';
import { ClientService } from './client.service';
import { OrdersService } from './orders.service';
import { MatMenuModule, MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClientsComponent } from './clients/clients.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { QzTrayService } from './qz-tray.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {AngularPrint} from 'angular-print';
import { AddClientComponent } from './add-client/add-client.component';
import { AgmCoreModule } from '@agm/core';
import { ClientsDetailsComponent } from './clients-details/clients-details.component';
import { AddClothComponent } from './add-cloth/add-cloth.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { ClothesComponent } from './clothes/clothes.component';
import { ClothesDetailsComponent } from './clothes-details/clothes-details.component';
import { CompanyComponent } from './company/company.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { PendingDeliveryComponent } from './pending-delivery/pending-delivery.component';
import { LoginComponent } from './login/login.component';
import { AccessResolverService } from './access-resolver.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ClientsComponent,
    AddOrderComponent,
    AddClientComponent,
    ClientsDetailsComponent,
    AddClothComponent,
    ClothesComponent,
    ClothesDetailsComponent,
    CompanyComponent,
    PendingOrdersComponent,
    PendingDeliveryComponent,
    LoginComponent,
    AccessDeniedComponent,
    AddUserComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAee0YfNLsIlYLK1Z1iUmwt5L-SK9Mu7Y4',
      libraries: ['places']
    })
  ],
  exports: [
    MatAutocompleteModule
  ],
  providers: [OrdersService, ClientService, QzTrayService, AuthGuardService, AuthService, AccessResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
