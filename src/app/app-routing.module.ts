import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { AlbumComponent } from "./album/album.component";
import { ArtistDiscographyComponent } from "./artist-discography/artist-discography.component";
import { FavouritesComponent } from "./favourites/favourites.component";
import { GuardAuthService } from "./guard-auth.service";
import { LoginComponent } from "./login/login.component";
import { NewReleasesComponent } from "./new-releases/new-releases.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RegisterComponent } from "./register/register.component";
import { SearchResultComponent } from "./search-result/search-result.component";

const routes: Routes = [
   {
      path: "newReleases",
      component: NewReleasesComponent,
      canActivate: [GuardAuthService],
   },
   {
      path: "search",
      component: SearchResultComponent,
      canActivate: [GuardAuthService],
   },
   {
      path: "favourites",
      component: FavouritesComponent,
      canActivate: [GuardAuthService],
   },
   {
      path: "artist/:id",
      component: ArtistDiscographyComponent,
      canActivate: [GuardAuthService],
   },
   {
      path: "album/:id",
      component: AlbumComponent,
      canActivate: [GuardAuthService],
   },
   {
      path: "about",
      component: AboutComponent,
      canActivate: [GuardAuthService],
   },
   {
      path: "",
      redirectTo: "/login",
      pathMatch: "full",
      // canActivate: [GuardAuthService],
   },
   {
      path: "register",
      component: RegisterComponent,
      canActivate: [GuardAuthService],
   },
   {
      path: "login",
      component: LoginComponent,
      // canActivate: [GuardAuthService],
   },
   {
      path: "**",
      component: NotFoundComponent,
      // canActivate: [GuardAuthService],
   },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
