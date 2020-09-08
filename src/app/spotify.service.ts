import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string;
  clientId: string = 'd0502d4fc5a9406b8afda0decad6a3d0';
  clientSecret: string = '6f9fdb44e4bf49bda20513dd4399bff6';
  playlist: any[]; 
  artist: any; 
  artistId: any;

  constructor(private http: HttpClient) { }

  getToken() {
    return this.http.post(`https://accounts.spotify.com/api/token`, `grant_type=client_credentials`, {
      headers: {
        Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
  getPlaylist(data: any): Observable<any> {
    let params = {
      limit: data.limit ? data.limit : 10,
      seed_artists: data.artist ? data.artist : '',
      target_valence: data.target_valence ? data.target_valence : 0.5,
      target_energy: data.target_energy ? data.target_energy : 1,
      target_danceability: data.target_danceability ? data.target_danceability : 0.7
    }
    return this.http.get('https://api.spotify.com/v1/recommendations', {params: params, headers: {Authorization: this.token}});
  }

  getArtist(data: any): Observable<any> {
    return this.http.get('https://api.spotify.com/v1/search', {params: {q: data.q ? data.q: '', type: "artist", limit: data.limit ? data.limit : 1}, headers: {Authorization: this.token}});
  }

  // setArtistId(id: any) {
  //   this.artistId = id;
  // }

  // getArtistId() {
  //   return this.artistId;
  // }

  getGenres() {
    return this.http.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {headers: {Authorization: this.token}})
  }

}
