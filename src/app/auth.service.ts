import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "./../environments/environment";
import jwt_decode from "jwt-decode";

import User from "./types/User";
import RegisterUser from "./types/RegisterUser";

@Injectable({
   providedIn: "root",
})
export class AuthService {
   constructor(private http: HttpClient) {}

   /**
    * @returns access token from local storage
    */
   getToken(): string | null {
      return localStorage.getItem("access_token");
   }

   /**
    * @returns jwt decoded access token
    */
   readToken(): string | null {
      return jwt_decode(localStorage.getItem("access_token") as string);
   }

   /**
    * @returns true if access token is in local storage
    */
   isAuthenticated(): boolean {
      return !!localStorage.getItem("access_token");
   }

   /**
    * @param user - user to register
    * @returns - observable of registered user
    */
   login(user: User): Observable<any> {
      return this.http.post(`${environment.userAPIBase}/api/login`, user);
   }

   /* removes access token from local storage */
   logout() {
      localStorage.removeItem("access_token");
   }

   register(registerUser: any): Observable<any> {
      return this.http.post(
         `${environment.userAPIBase}/api/register`,
         registerUser,
         { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
      );
   }
}
