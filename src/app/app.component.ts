/*********************************************************************************
 * WEB422 – Assignment 6
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Shawn Yu         Student ID: 160568192             Date: 2022-04-08
 * Heroku Link: https://fierce-river-60604.herokuapp.com/
 * Angular App (Deployed) Link: https://6250472f431f25182143dd30--roaring-cuchufli-3b0de0.netlify.app/album/6np2Ix6RidhSseqw2dZovP
 *
 ********************************************************************************/

import { Component, OnInit } from "@angular/core";
import { NavigationError, NavigationStart, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
   selector: "app-root",
   templateUrl: "./app.component.html",
   styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
   title = "web422-a4";
   searchString: string = "";
   token: any | undefined;

   constructor(private router: Router, private authService: AuthService) {}

   ngOnInit(): void {
      this.router.events.subscribe((val) => {
         if (val instanceof NavigationStart) {
            this.token = this.authService.getToken();
         }
      });
   }

   handleSearch() {
      this.router.navigate(["/search"], {
         queryParams: { q: this.searchString },
      });
      this.searchString = "";
   }

   logout() {
      console.log("Logged out");
      localStorage.clear();
      this.router.navigate(["/login"]);
   }
}
