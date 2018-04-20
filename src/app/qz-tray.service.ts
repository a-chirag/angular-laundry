import { ClientService } from './client.service';
import { Company } from './company';
import { Order } from './order';
import { OrderDetails } from './orderdetails';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {sprintf} from 'sprintf-js';
declare var qz: any;
@Injectable()
export class QzTrayService {
  config: any;
  company: Company;
  types = [
    {value: '0', viewValue: 'Wash And Fold'},
    {value: '1', viewValue: 'Wash And Iron'},
    {value: '2', viewValue: 'Premium W&F'},
    {value: '3', viewValue: 'Premium W&I'},
    {value: '4', viewValue: 'Dry Cleaning'},
    {value: '5', viewValue: 'Ironing'},
    {value: '6', viewValue: 'Polishing'}
  ];
  yPosition: number;
  barcodePosition: number;
  constructor(private clientService: ClientService) {
    this.clientService.getCompany().subscribe(company => this.company = company);

  qz.websocket.connect().then(() => {console.log('connected'); } );
  }

  printData(printer: string, order: Order): Observable<any> {
this.config = qz.configs.create(printer);
    let data = [
    { type: 'raw', data: '\x1B' + '\x40' + '\x1B' + '\x61' + '\x31', options: { language: 'ESCPOS', dotDensity: 'single' }  },
      { type: 'raw', data: this.company.name + '\n', options: { language: 'ESCPOS', dotDensity: 'single' }  },
      { type: 'raw', data: 'Website : ' + this.company.website + '\n', options: { language: 'ESCPOS', dotDensity: 'single' }  },
      { type: 'raw', data: 'Email : ' + this.company.email + '\n', options: { language: 'ESCPOS', dotDensity: 'single' }  },
      { type: 'raw', data: 'Address : ' + this.company.address + '\n', options: { language: 'ESCPOS', dotDensity: 'single' }  },
      { type: 'raw', data: 'Customer Care : ' + this.company.phoneNo + '\n', options: { language: 'ESCPOS', dotDensity: 'single' }  },
      { type: 'raw', data: 'GST No. : ' + this.company.gstNo + '\n', options: { language: 'ESCPOS', dotDensity: 'single' }  },
      { type: 'raw', data: 'Submission Date: ' + order.submissionDate + '\n', options: { language: 'ESCPOS', dotDensity: 'single' }  },
      { type: 'raw', data: 'Bill No. :' + order.id + '\n', options: { language: 'ESCPOS', dotDensity: 'single' }  },
      { type: 'raw', data: '---------------------------------------\n', options: { language: 'ESCPOS', dotDensity: 'single' }  },
{ type: 'raw', data: sprintf('%-22s %-9s %3s', 'Item', 'Quantity', 'Amount') + '\n',
   options: { language: 'ESCPOS', dotDensity: 'single' }  }
    ];
    order.orderDetails.forEach(or => {
      let dat = { type: 'raw', data: '' , options: { language: 'ESCPOS', dotDensity: 'single' }  };
      dat.data = dat.data.concat(this.toPrint(or) + '\n');
      data.push(dat);
    });
    data.push({ type: 'raw', data: '---------------------------------------\n', options: { language: 'ESCPOS', dotDensity: 'single' }  });
    data.push({ type: 'raw', data: sprintf('%-25s %3d', 'Total Units   :   ', order.totalQuantity) + '\n',
       options: { language: 'ESCPOS', dotDensity: 'single' }  });
    data.push({ type: 'raw', data: sprintf('%-25s %3.2f', 'Total   :   ', order.amount) + '\n',
       options: { language: 'ESCPOS', dotDensity: 'single' }  });
    data.push({ type: 'raw', data: sprintf('%-25s %3.2f', 'CGST@9%   :   ', order.tax / 2) + '\n',
       options: { language: 'ESCPOS', dotDensity: 'single' }  });
    data.push({ type: 'raw', data: sprintf('%-25s %3.2f', 'SGST@9%   :   ', order.tax / 2) + '\n',
       options: { language: 'ESCPOS', dotDensity: 'single' }  });
    data.push({ type: 'raw', data: sprintf('%-25s %3.2f', 'Total Payable   :   ', order.total) + '\n',
       options: { language: 'ESCPOS', dotDensity: 'single' }  });
    data.push({ type: 'raw', data: sprintf('%-15s %13s', 'Delivery Date   :   ', order.expectedDeliveryDate.toString()) + '\n',
       options: { language: 'ESCPOS', dotDensity: 'single' }  });
    data.push({ type: 'raw', data: '---------------------------------------\n', options: { language: 'ESCPOS', dotDensity: 'single' }  });
    data.push({ type: 'raw', data: this.company.termsAndCondition + '\n', options: { language: 'ESCPOS', dotDensity: 'single' }  });
    data.push({ type: 'raw', data: this.company.thankingNote + '\n', options: { language: 'ESCPOS', dotDensity: 'single' }  });
    data.push({ type: 'raw', data: '\n\n\n\n\n\n\n', options: { language: 'ESCPOS', dotDensity: 'single' }  });
    data.push({ type: 'raw', data: '\x1B' + '\x69', options: { language: 'ESCPOS', dotDensity: 'single' }  });
     return Observable.fromPromise(qz.print(this.config, data));
}
  errorHandler(error: any): Observable<any> {
    return Observable.throw(error);
  }
  toPrint(or: OrderDetails): string {
    return sprintf('%-25s %-9d %3.2f',
                  or.clothName,
                  or.quantity,
                  or.amount);
  }
  printBarcode(printer: string, order: Order): Observable<any> {
    this.yPosition = 10;
    let totalQuantity = order.totalQuantity * 1.5 + 1;
    this.config = qz.configs.create(printer);
    let data = [
 'GAP 0,0\n',
 'SIZE 35 mm,' + totalQuantity + '\n',
 'DIRECTION 0\n',
 'CLS\n'
        ];
    order.orderDetails.forEach(or => {
      if (or.clothName !== 'weight') {
      for ( let i = 0; i < or.quantity; i++) {
    data.push(this.companyTitle(this.yPosition));
      this.yPosition = this.yPosition + 50;
      data.push(this.barcode(this.yPosition, or.jobOrderId));
      this.yPosition = this.yPosition + 120;
      data.push(this.clothname(this.yPosition, or.clothName));
      this.yPosition = this.yPosition + 50;
      data.push(this.orderType(this.yPosition, or.orderType));
      this.yPosition = this.yPosition + 30;
        data.push(this.deliveryDate(this.yPosition, order.expectedDeliveryDate.toString()));
      this.yPosition = this.yPosition + 70;
      console.log(data.toString());
     } }
    });
    data.push('PRINT 1');
   return Observable.fromPromise(qz.print(this.config, data))
  }
  clothname(position: number, cloth: string): string {
  return 'TEXT 50,' + position + ',"2",0,1,1,"' + cloth + '"\n';
}
companyTitle(position: number): string {
  return 'TEXT 50,' + position + ',"2",0,1,1,"' + this.company.name + '"\n';
}
  barcode(position: number, id: string): string {
    return 'BARCODE 50,' + position + ',"128",60,2,0,3,30,"' + id + '"\n';
  }
  orderType(position: number, orderT: number): string {
    return 'TEXT 50,' + position + ',"2",0,1,1,"' + this.types[orderT].viewValue + '"\n';
  }
  deliveryDate(position: number, date: string): string {
    console.log(date);
     return 'TEXT 50,' + position + ',"2",0,1,1,"' + date + '"\n';
  }
}
