import {Injectable} from '@angular/core';
import {ClientSegment} from "../../model/client-segment";
import {GenericService} from "./generic-service";

@Injectable({
  providedIn: 'root'
})
export class ClientSegmentService extends GenericService<ClientSegment> {

}
