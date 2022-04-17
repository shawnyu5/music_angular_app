import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
   selector: "app-register",
   templateUrl: "./register.component.html",
   styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
   registerUser: { userName: string; password: string; password2: string } = {
      userName: "",
      password: "",
      password2: "",
   };
   warning = "";
   success = false;
   loading = false;
   constructor(private authService: AuthService) {}

   ngOnInit(): void {}

   onSubmit() {
      if (
         (this.registerUser.password &&
            this.registerUser.userName &&
            this.registerUser.password2) != ""
      ) {
         this.loading = true;
         this.authService.register(this.registerUser).subscribe({
            next: (_) => {
               console.log("login success");
               this.success = true;
               this.warning = "";
               this.loading = false;
            },
            error: (err) => {
               this.success = false;
               this.warning = err.error.message;
               console.error(err);
            },
         });
      }
   }
}
