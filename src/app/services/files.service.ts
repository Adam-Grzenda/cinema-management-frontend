import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient
  ) {
  }

  uploadFile(key: string, imageB64: string): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + '/files/' + key, {"file": imageB64})
  }

}
