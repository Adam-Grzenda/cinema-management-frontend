import {Injectable} from '@angular/core';
import {Film} from "../../model/film";
import {Observable, of} from "rxjs";
import {ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getAll(): Observable<Array<Film>> {
    return this.http.get<Array<Film>>(environment.apiEndpoint + '/films/');
  }

  public getOne(id: number): Observable<Film> {
    return this.http.get<Film>(environment.apiEndpoint + '/films/' + id);
  }

  public add(film: Film, poster?: File): Observable<Film> {
    const data = new FormData();
    if (poster) {
      data.append("poster", poster);
    }

    return this.http.post<Film>(environment.apiEndpoint + '/films/', data);
  }

  public update(film: Film): Observable<Film> {
    return this.http.put<Film>(environment.apiEndpoint + '/films/', film);
  }

  public delete(film: Film): Observable<any> {
    return this.http.delete(environment.apiEndpoint + '/films/' + film.id);
  }

  public getAllSub(id: number): Observable<ResourceCollection<any>> {
    return of(new ResourceCollection());
  }

  public getByTitle(title: string): Observable<Film> {
    return this.http.get<Film>(environment.apiEndpoint + '/films/search/title/' + title);
  }
}
