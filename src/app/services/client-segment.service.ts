import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ClientSegment} from "../../model/client-segment";

@Injectable({
  providedIn: 'root'
})
export class ClientSegmentService {
  private segments: Array<ClientSegment>;

  constructor() {
    this.segments = new Array<ClientSegment>();
  }

  public getSegments(): Observable<ClientSegment[]> {
    return of(this.segments)
  }

  public addSegment(segment: ClientSegment): Observable<ClientSegment> {
    this.segments.push(segment);
    return of(segment);
  }
}
