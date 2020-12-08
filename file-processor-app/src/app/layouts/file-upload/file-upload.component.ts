import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { NotificationService } from 'src/app/_core/services/notification.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
  isUploaded = false;
  file: any;
  fileType = '';
  moment = moment;
  @ViewChild('fileUpload')
  fileUpload!: ElementRef;
  isProcessed = false;
  displayedColumns: string[] = ['id', 'domain', 'visitors', 'date'];
  dataSource: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onUpload(event: Event): void {
    if (this.fileUpload) { this.fileUpload.nativeElement.click(); }
  }

  onSelectFile(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      const fileArray = this.file.name.split('.');
      this.fileType = fileArray[fileArray.length - 1];
      this.isUploaded = true;
      this.getFile();
    }
  }

  onClose(): void {
    this.isUploaded = false;
    this.dataSource = [];
    if (this.fileUpload) {
      this.fileUpload.nativeElement.value = '';
    }
  }

  getFile(): void {
    if (this.fileType === 'json') {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.dataSource = JSON.parse(_.get(fileReader, 'result', []));
        const firstObject = this.dataSource[0];
        if (_.isEmpty(_.get(firstObject, 'id', ''))
            || _.isEmpty(_.get(firstObject, 'domain', ''))
            || !_.isNumber(_.get(firstObject, 'visitors', ''))
            || _.isEmpty(_.get(firstObject, 'date', ''))) {
            this.notificationService.openErrorSnackBar('Invalid Columns. Columns Should be (id, domain, visitors, date)');
        } else {
          this.isProcessed = true;
          this.notificationService.openSuccessSnackBar('Files processed successfully!');
        }
      };
      fileReader.readAsText(this.file);
    } else {
      this.notificationService.openErrorSnackBar('Error: invalid file type!! file must be in json');
    }
  }
}
