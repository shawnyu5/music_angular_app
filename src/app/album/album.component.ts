import { Component, OnDestroy, OnInit } from "@angular/core";
import { MusicDataService } from "../music-data.service";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";

@Component({
   selector: "app-album",
   templateUrl: "./album.component.html",
   styleUrls: ["./album.component.css"],
})
export class AlbumComponent implements OnInit, OnDestroy {
   album: any;
   private albumSub: Subscription | undefined;
   private routeSub: Subscription | undefined;

   constructor(
      private musicData: MusicDataService,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar
   ) {}

   ngOnInit(): void {
      this.routeSub = this.route.params.subscribe((params) => {
         this.albumSub = this.musicData
            .getAlbumById(params["id"])
            .subscribe((data) => {
               this.album = data;
            });
      });
   }

   addToFavourites(id: string) {
      console.log("adding to favourites");
      this.musicData.addToFavourites(id).subscribe((data) => {
         if (data) {
            this.snackBar.open("Added to favourites", "", {
               duration: 2000,
            });
         } else {
            this.snackBar.open("Unable to add to favourites", "", {
               duration: 2000,
            });
         }
      });
      // if (this.musicData.addToFavourites(id)) {
      // this.snackBar.open("Adding to Favourites...", "Done", {
      // duration: 1500,
      // });
      // }
   }

   ngOnDestroy(): void {
      this.albumSub?.unsubscribe();
      this.routeSub?.unsubscribe();
   }
}
