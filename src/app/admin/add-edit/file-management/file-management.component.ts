import {Component, OnInit} from '@angular/core';
import {File} from "../../../../model/file";
import {FilesService} from "../../../services/files.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.css']
})
export class FileManagementComponent implements OnInit {

  selection: File;

  files: Array<File>;

  constructor(private filesService: FilesService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<FileManagementComponent>) {
  }

  ngOnInit(): void {
    this.filesService.listFiles().subscribe(
      files => {
        this.files = files.files;
      }, error => {
        this.snackBar.open('Could not list files. Try again later.', 'close', {
          duration: 5000
        })
      }
    )
  }

  selectFile(selection: File): void {
    this.selection = selection;
  }

  closeAndReturn(): void {
    this.dialogRef.close({data: this.selection})
  }


  isFileSelected(): boolean {
    return !!this.selection;
  }

}
