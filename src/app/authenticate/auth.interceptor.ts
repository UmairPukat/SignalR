import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class authInterceptor implements HttpInterceptor{
    constructor(private router: Router){

    }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNjA5ZTUwYS0zMzBkLTRkYjAtOWYzMy1kOTM3Y2I3OTA0NjkiLCJmYW1pbHlfbmFtZSI6IjYvMTQvMjAyMyA4OjUxOjQwIEFNIiwiaWF0IjoiNi8xNC8yMDIzIDg6NTE6NDAgQU0iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IkFnZW50IDMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJBZ2VudDNAZ21haWwuY29tIiwiVXNlcklkIjoiNTAiLCJVc2VyTmFtZSI6IkFnZW50M0BnbWFpbC5jb20iLCJleHAiOjE2ODY4MTkxMDAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY5LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQyMDAifQ.Inl7juE6Zwsbf2nmsTU7F5Bpg-gNlNiCvdecaXe7E7A";
        if (Token != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + Token)
            });
            
            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status == 401){
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/MasterHome');
                        }
                        else if(err.status == 403)
                        this.router.navigateByUrl('/forbidden');
                    }
                )
            )
        }
        else
            return next.handle(req.clone());
    }
    
}