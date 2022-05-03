import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SecurityService } from "./security.service";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.securityService.getToken();
    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });

    return next.handle(request);
  }



}
