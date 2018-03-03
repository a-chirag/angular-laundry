import { Injectable } from '@angular/core';
import Printer from 'escpos-print/Printer';
import { Font, Justification, TextMode } from 'escpos-print/Commands';
import { Network, Usb } from 'escpos-print/Adapters';

const adapter = new Usb(0x20d1, 0x7008);
const printerP = new Printer(adapter).open();

@Injectable()
export class EscposPrintService {
printer: Printer;
  constructor() {
  printerP.then(printer => this.printer = printer);
  }

  printData(prnter: string, data: any): any{
    this.printer.setFont(Font.A)
       .setJustification(Justification.Center)
       .setTextMode(TextMode.DualWidthAndHeight)
       .writeLine('This is some large centered text')
       .setTextMode(TextMode.Normal)
       .setJustification(Justification.Left)
       .writeLine('Some normal text')
       .feed(4)
       .close()
       .then(() => console.log('Done printing...'))
  }

}
