import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {File} from "../../model/file";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  public getImage(id: number): Observable<File> {
    return this.http.get<File>(environment.apiEndpoint + "/films/" + id + "/poster");
  }
}

