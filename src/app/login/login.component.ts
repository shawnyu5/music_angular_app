import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
   selector: "app-login",
   templateUrl: "./login.component.html",
   styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
   user = { userName: "", password: "", _id: "" };
   warning = "";
   loading = false;
   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {}

   onSubmit() {
      if (this.user.userName != "" && this.user.password != "") {
         this.loading = true;
         this.authService.login(this.user).subscribe({
            next: (data) => {
               console.log("Login Successful");
               this.loading = false;
               localStorage["access_token"] = data.token;
               this.router.navigate(["/newReleases"]);
            },
            error: (err) => {
               this.warning = err.error.message;
               this.loading = false;
            },
         });
      }
   }
}
