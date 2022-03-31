import {File} from "./file";

export class FilesResponse {
  files: Array<File>;

  truncated: boolean;
  continuationToken: string;
}
