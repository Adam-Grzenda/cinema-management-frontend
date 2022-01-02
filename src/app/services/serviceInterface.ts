import {Observable} from "rxjs";

export interface ServiceInterface {


  delete(object: any): Observable<any>;

}
