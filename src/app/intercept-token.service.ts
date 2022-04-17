import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
   providedIn: "root",
})
export class InterceptTokenService {
   constructor(private auth: AuthService) {}

   intercept(
      request: HttpRequest<any>,
      next: HttpHandler
   ): Observable<HttpEvent<any>> {
      if (!request.url.includes("spotify.com")) {
         // Clone the existing request, and add the authorization header
         request = request.clone({
            setHeaders: {
               Authorization: `JWT ${this.auth.getToken()}`,
            },
         });
      }
      // Pass the request on to the next handler
      return next.handle(request);
   }
}
