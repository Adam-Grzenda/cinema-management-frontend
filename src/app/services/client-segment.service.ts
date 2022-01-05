import {Injectable} from '@angular/core';
import {ClientSegment} from "../../model/client-segment";
import {AbstractService} from "./abstract-service";

@Injectable({
  providedIn: 'root'
})
export class ClientSegmentService extends AbstractService<ClientSegment> {

}
