import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {File} from "../../model/file";
import {FilesResponse} from "../../model/FilesResponse";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient
  ) {
  }

  putFile(key: string, imageB64: string): Observable<any> {
    return this.http.post<any>(environment.apiEndpoint + '/files/' + key, {"file": imageB64})
  }

  getFile(key: string): Observable<string> {
    return this.http.get<string>(environment.apiEndpoint + '/files/' + key);
  }

  listFiles(maxKeys: number = 10, continuationToken: string = ""): Observable<FilesResponse> {
    let params = new HttpParams();
    params = params.append('maxKeys', maxKeys);
    if (continuationToken != "") {
      params = params.append('continuationToken', continuationToken)
    }

    return this.http.get<FilesResponse>(environment.apiEndpoint + '/files/list', {params});
  }
}
