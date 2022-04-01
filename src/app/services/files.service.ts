import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FilesResponse} from "../../model/FilesResponse";
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  uploadForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
  }

  putFile(file: any): Observable<any> {
    console.log(file)
    // @ts-ignore
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(environment.apiEndpoint + '/files/' + file.name.replace(/[^a-z0-9]/gi, '_').toLowerCase(), formData)
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

  deleteFile(key: string): Observable<any> {
    return this.http.delete<any>(environment.apiEndpoint + '/files/' + key);
  }

}
