import {Injectable} from '@angular/core';
import {HttpResponse, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/do';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        console.log('from loging-interceptors - req',req);
        return next
        .handle(req)
        .do(event => {
            if (event instanceof HttpResponse) {
                console.log('form logging-interceptor - event',event);
            }
        })
    }
}