import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SpotifyTokenService } from "./spotify-token.service";

import { mergeMap } from "rxjs/operators";
import { environment } from "../environments/environment";

@Injectable({
   providedIn: "root",
})
export class MusicDataService {
   constructor(
      private spotifyToken: SpotifyTokenService,
      private http: HttpClient
   ) {}

   getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(
         mergeMap((token) => {
            return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(
               "https://api.spotify.com/v1/browse/new-releases",
               { headers: { Authorization: `Bearer ${token}` } }
            );
         })
      );
   }

   getArtistById(id: string): Observable<SpotifyApi.SingleArtistResponse> {
      return this.spotifyToken.getBearerToken().pipe(
         mergeMap((token) => {
            return this.http.get<SpotifyApi.SingleArtistResponse>(
               `https://api.spotify.com/v1/artists/${id}`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
         })
      );
   }

   getAlbumsByArtistId(
      id: string
   ): Observable<SpotifyApi.ArtistsAlbumsResponse> {
      return this.spotifyToken.getBearerToken().pipe(
         mergeMap((token) => {
            // NOTE: Important to include the query parameters include_groups and limit here, to show the maximum amount of albums on one page
            return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(
               `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
         })
      );
   }

   getAlbumById(id: string): Observable<SpotifyApi.SingleAlbumResponse> {
      return this.spotifyToken.getBearerToken().pipe(
         mergeMap((token) => {
            return this.http.get<SpotifyApi.SingleAlbumResponse>(
               `https://api.spotify.com/v1/albums/${id}`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
         })
      );
   }

   searchArtists(
      searchString: string
   ): Observable<SpotifyApi.ArtistSearchResponse> {
      return this.spotifyToken.getBearerToken().pipe(
         mergeMap((token) => {
            return this.http.get<SpotifyApi.ArtistSearchResponse>(
               `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
         })
      );
   }

   addToFavourites(id: string): Observable<[String]> {
      // make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
      // console.log("Making put request to add to favourites");
      return this.http.put<[String]>(
         // "/api/user/favourites/:id",
         `${environment.userAPIBase}/api/user/favourites/${id}`,
         { _id: id }
      );
   }

   removeFromFavourites(id: string): Observable<any> {
      console.log("removing from favorites");
      return this.http
         .delete<[String]>(
            // "/api/user/favourites/:id ",
            `${environment.userAPIBase}/api/user/favourites/${id}`
         )
         .pipe(
            mergeMap((favouritesArray) => {
               //: Perform the same tasks as the original getFavourites()
               // method, only using "favouritesArray" from above, instead of
               // this.favouritesList
               // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
               if (favouritesArray.length > 0) {
                  return this.spotifyToken.getBearerToken().pipe(
                     mergeMap((token) => {
                        return this.http.get<any>(
                           `https://api.spotify.com/v1/tracks?ids=${favouritesArray.join()}`,
                           { headers: { Authorization: `Bearer ${token}` } }
                        );
                     })
                  );
               } else {
                  return new Observable((o) => {
                     o.next({ tracks: [] });
                  });
               }
            })
         );
   }

   getFavourites(): Observable<any> {
      return this.http
         .get<[String]>(`${environment.userAPIBase}/api/user/favourites/`)
         .pipe(
            mergeMap((favouritesArray) => {
               // Perform the same tasks as the original getFavourites()
               // method, only using "favouritesArray" from above, instead of
               // this.favouritesList
               // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}

               if (favouritesArray.length > 0) {
                  return this.spotifyToken.getBearerToken().pipe(
                     mergeMap((token) => {
                        return this.http.get<any>(
                           `https://api.spotify.com/v1/tracks?ids=${favouritesArray.join()}`,
                           { headers: { Authorization: `Bearer ${token}` } }
                        );
                     })
                  );
               } else {
                  return new Observable((o) => {
                     o.next({ tracks: [] });
                  });
               }
            })
         );
   }
}
