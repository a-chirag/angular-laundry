import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {headersToString} from "selenium-webdriver/http";

@Injectable()
export class NotificationService {
  private notificationUrl = "/v1/notificationapi/message"
  constructor(private http: HttpClient) { }
public sendNotification(jobOrder : string){
    var httpheaders = new HttpHeaders();
    var body = {"orderId": jobOrder};
    httpheaders.append('Content-Type','application/json');
    this.http.post(this.notificationUrl,body,{'headers':httpheaders}).subscribe();
}
  public sendDeliveryNotification(jobOrder : string){
    var httpheaders = new HttpHeaders();
    var body = {"orderId": jobOrder};
    httpheaders.append('Content-Type','application/json');
    this.http.post(this.notificationUrl+"/delivery",body,{'headers':httpheaders}).subscribe();
  }
}
