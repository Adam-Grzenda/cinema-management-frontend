import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}

  public uploadImage(image: File): Observable<ImageUploadResponse> {
    const data = new FormData();
    data.append("image", image);
    return this.http.post<ImageUploadResponse>(environment.apiEndpoint + "/upload", data);
  }

  public getImage(id: number): Observable<Blob> {
    return this.http.get(environment.apiEndpoint + "/films/" + id + "/poster", {responseType: "blob"});
  }
}

export class ImageUploadResponse {
  href: string;
}
