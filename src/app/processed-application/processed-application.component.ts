import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LoadingBarService } from '../loading-bar/loading-bar.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceServiceService } from '../service-service.service';
import { NgxCaptureService } from 'ngx-capture';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import * as html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import { BehaviorSubject } from 'rxjs';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


// import * as ExcelJS from 'exceljs';
@Component({
  selector: 'app-processed-application',
  templateUrl: './processed-application.component.html',
  styleUrls: ['./processed-application.component.css']
})
export class ProcessedApplicationComponent implements OnInit {
  @ViewChild('selectElement', { static: true }) selectElementRef: ElementRef;
  @Output() SelectedOrg = new EventEmitter();
  Org: any;
  language: string;
  defaultZoomLevel: number = 0.54;
  Form: UserForm={} as UserForm;
  currentPage = 1;
  pageSize = 1; // Number of items per page
  totalItems = 0; // Total number of items
  totalPages = 0; // Total number of pages
  pageRange: number[] = [];
  paginatedUsers: any[] = [];
  noRecord: boolean=true;
  NumberofApp: number;
  organization: any;
  fitrstappno: any;
  AllApp: any[];
  // currentPage = 1;
  NumberofAllApp: number;
  showMessagepoup: boolean=false;
  message: any;
messages: string[] = []; // Array to store all messages
userss: string[] = []; // Array to store all usernames
currentIndex = 0;
item: any = {};
  data: any;
  filterMeassage: any[];
  selectBy: any;
  checkAppOrg: any;
  checkAppOrglength: any;
  subPrefix: string;
  dataLength: number;
  isHere: boolean=true;
  hideUserName: boolean;

passAppNo(arg0: any) {
throw new Error('Method not implemented.');
}
  users:any
  constructor(
    // public service: MyServiceService, 
    // public notificationsService: NotificationsService,
    public loadingBarService:LoadingBarService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private service: ServiceServiceService,
    private captureService:NgxCaptureService
    ) {   }
  ngOnInit() {
    this.selectElementRef.nativeElement.value = "app";

    // Trigger the change event
    this.selectElementRef.nativeElement.dispatchEvent(new Event('change'));
    this.Form.active=true
     this.getOrganization()
  this.getorg()
  this.route.params.subscribe(params => {
   console.log("language", environment.lang);
      if (environment.lang === "am-et" || environment.lang === "am-ET") {
        this.language = "amharic";
      } else {
        this.language = "english";
      }
    });
  }
  
  exportToPDF(): void {
    const element = document.getElementById('data-table');

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 size
      const imgWidth = 210; // A4 size width in mm
      const pageHeight = 295; // A4 size height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('exported_data.pdf');
    });
  }
  exportToPDFAll(): void {
    const element = document.getElementById('data-table2');

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 size
      const imgWidth = 210; // A4 size width in mm
      const pageHeight = 295; // A4 size height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('exported_data.pdf');
    });
  }
  
//   exportAsPdf() {
//   const pdf = new jsPDF();

//   // Loop through each group
//   this.users.forEach((group, index) => {
//     const table = document.getElementById(`data-table-${index}`); // Use unique IDs for each group table
//     html2canvas(table).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const imgProps = pdf.getImageProperties(imgData);
//       const width = pdf.internal.pageSize.getWidth();
//       const height = (imgProps.height * width) / imgProps.width;
      
//       // Add the image of the group to the PDF
//       if (index !== 0) {
//         pdf.addPage(); // Add a new page for each group except the first one
//       }
//       pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      
//       // If it's the last group, save the PDF
//       if (index === this.users.length - 1) {
//         pdf.save('table.pdf');
//       }
//     });
//   });
// }

//   exportAsPdf2() {
//     const table = document.getElementById('data-table');
//     html2canvas(table).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF();
//       const imgProps = pdf.getImageProperties(imgData);
//       const width = pdf.internal.pageSize.getWidth();
//       const height = (imgProps.height * width) / imgProps.width;
//       pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//       pdf.save('table.pdf');
//     });
//   }
  exportAll(){
    this.service.getApplicationStatus('', this.Form.subcity).subscribe((response: any) => {
      this.AllApp = this.groupRecordsByApplicationNumber(response);
      console.log('allapps',this.AllApp,this.users);
      
      // this.fitrstappno=this.users[0].applicationNumber
      this.NumberofAllApp=this.AllApp.length
      this.exportToExcelAll()
     
    });
  }
  exportSingle(){
    this.exportToExcel()
  }
  exportToExcel(): void {
    const table = document.getElementById('data-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table, { raw: true });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Generate the Excel file with styles embedded
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  
    function s2ab(s: any): ArrayBuffer {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    }
  
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  exportToExcelAll(): void {
    const table = document.getElementById('data-table2');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table, { raw: true });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // Generate the Excel file with styles embedded
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  
    function s2ab(s: any): ArrayBuffer {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    }
  
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  

  passSelectBy(event){
    console.log('eventtttsss',event);
    this.selectBy=event
    this.Form.applictaion_Number=''
  }
 
  getOrganization(){
    // this.loadingBarService.loadingBarSubject = new BehaviorSubject<boolean>(true);
    this.service.getOrganization().subscribe((response:any)=>{
      this.organization=response.procorganizationss.filter((value)=>
        value.organization_code !='3d26a10c-9be9-4261-bf97-ab6f39455ed3'&&
        value.organization_code !='275619f2-69c2-4fb7-a053-938f0b62b088'&&
        // value.organization_code !='1efb0336-26c6-4bf1-aeb8-8da0d4f7dbbb'&&
        value.organization_code !='5ef1475c-2b66-4087-b1b7-63e6c6cd7ca1'&&
        value.organization_code !='1809e356-d00f-42f9-8425-41a149dfd60f');
        // this.loadingBarService.loadingBarSubject = new BehaviorSubject<boolean>(false);
      console.log('response',this.organization); 
    })
  }
// Declare variables to store messages, usernames, and current index
 // Current index of the message being displayed
// Initialize item object in your component
 // You can replace 'any' with a specific type if available

// Rest of your component code...


// Calculate starting page number for pagination
getStartingPageNumber(currentPage: number): number {
  if (currentPage <= 2) {
    return 1;
  } else {
    return currentPage - 1;
  }
}
close(){
  this.showMessagepoup = false;
}
displayMessage(userName: any, Appno: any,todocode: any) {
  this.service.getPostitnote(Appno, userName).subscribe((response: any[]) => {
    // Store messages and usernames in arrays
    this.filterMeassage=response.filter((value)=>value.postit_note_code==todocode)
    this.messages = this.filterMeassage.map(item => item.remarks);
    this.userss = this.filterMeassage.map(item => item.userName);
    console.log('logpostitnote', this.filterMeassage,todocode);
    this.showMessagepoup = true;
    // Update the header username
    this.item.username = this.userss[this.currentIndex];
  });
}
displayAllMessage(Appno: any) {
  this.service.getPostitnote(Appno,'').subscribe((response: any[]) => {
    // Store messages and usernames in arrays
    this.messages = response.map(item => item.remarks);
    this.userss = response.map(item => item.userName);
    // console.log('logpostitnote', this.filterMeassage,todocode);
    this.showMessagepoup = true;
    // Update the header username
    this.item.username = this.userss[this.currentIndex];
  });
}

next() {
  if (this.currentIndex < this.messages.length - 1) {
    this.currentIndex++; // Move to the next message if available
    // Update the header username
    this.item.username = this.userss[this.currentIndex];
  }
}

previous() {
  if (this.currentIndex > 0) {
    this.currentIndex--; // Move to the previous message if available
    // Update the header username
    this.item.username = this.userss[this.currentIndex];
  }
}


  
  passSubcity(values) {
   
    this.Form.subcity=values
  console.log('subbb',this.Form.subcity);
  }
  getApplicatStatus() {
    this.noRecord=true
    this.loadingBarService.loadingBarSubject= new BehaviorSubject<boolean>(true);
    if (this.Form.applictaion_Number==undefined) {
      this.Form.applictaion_Number=''
      
    }
    
    this.service.getApplicationStatus( this.selectBy+','+this.Form.applictaion_Number, this.Form.subcity).subscribe((response: any) => {
      this.data=response.procviewStatusReports
      this.dataLength=this.data.length
      if(this.data.length!==0){
        this.isHere=true
        this.users = this.groupRecordsByApplicationNumber(response.procviewStatusReports);
        this.fitrstappno=this.users[0].applicationNumber
        this.NumberofApp=this.users.length
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.pageRange = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Generate array from 1 to totalPages
        this.changePage(1);
        console.log('responseee', this.users[0].applicationNumber);
        this.noRecord=false
        this.SelectedOrg.emit(this.Form.subcity)
        this.loadingBarService.loadingBarSubject= new BehaviorSubject<boolean>(false);
        console.log('NumberofApp',this.users,this.data);
      }else{
        this.isHere=true
        if(this.Form.subcity=='6921d772-3a1c-4641-95a0-0ab320bac3e2'){
          this.subPrefix='AR'
          console.log('subbbb',this.subPrefix);
          
        }else if(this.Form.subcity=='f8ea62db-05bc-4f1a-ab30-4e926d43e3fb'){
          this.subPrefix='NL'
          console.log('subbbb',this.subPrefix);
          
        }
        else if(this.Form.subcity=='6a8c042f-a3e1-4375-9769-54d94c2312c6'){
          this.subPrefix='GU'
          console.log('subbbb',this.subPrefix);
          
        }else if(this.Form.subcity=='89eb1aec-c875-4a08-aaf6-2c36c0864979'){
          this.subPrefix='BL'
          console.log('subbbb',this.subPrefix);
          
        }else if(this.Form.subcity=='7101d44d-97d5-41aa-957d-82f36d928c07'){
          this.subPrefix='AD'
          console.log('subbbb',this.subPrefix);
          
        }else if(this.Form.subcity=='e4d8219e-51f9-40cb-9d53-883c6ca9aaa3'){
          this.subPrefix='LD'
          console.log('subbbb',this.subPrefix);
          
        }else if(this.Form.subcity=='1efb0336-26c6-4bf1-aeb8-8da0d4f7dbbb'){
          this.subPrefix='AACA'
          console.log('subbbb',this.subPrefix);
          
        }else if(this.Form.subcity=='f02e9467-1b7d-4350-bee7-9844d4f56da0'){
          this.subPrefix='LMK'
          console.log('subbbb',this.subPrefix);
          
        }else if(this.Form.subcity=='8222f028-5fe3-4047-9a50-b52bfa64c851'){
          this.subPrefix='YK'
          console.log('subbbb',this.subPrefix);
          
        }else if(this.Form.subcity=='08f9c927-6366-467a-ba99-c837c5add427'){
          this.subPrefix='AK'
          console.log('subbbb',this.subPrefix);
          
        }else if(this.Form.subcity=='aaa5094c-8899-4708-9f7b-d8ff634a3540'){
          this.subPrefix='KS'
          console.log('subbbb',this.subPrefix);
          
        }else if(this.Form.subcity=='930d1c20-9e0e-4a50-9eb2-e542fafbad68'){
          this.subPrefix='KK'
          console.log('subbbb',this.subPrefix);
          
        }

        this.service.getApplicationStatusCheckOrg(this.subPrefix+','+ this.Form.applictaion_Number).
        subscribe((res:any)=>{
          this.checkAppOrg=res.results
          this.checkAppOrglength=res.results.length
          console.log('NumberofApp',res.results        );
          this.isHere=false
        })
      }
     
    });
  }
  showMore(){
    this.Form.subcity='1efb0336-26c6-4bf1-aeb8-8da0d4f7dbbb'
    this.getApplicatStatus();
    this.hideUserName=true
  }
  goToFirstPage() {
    if (this.currentPage !== 1) {
      this.changePage(1);
    }
  }
  
  goToLastPage() {
    if (this.currentPage !== this.totalPages) {
      this.changePage(this.totalPages);
    }
  }
  groupRecordsByApplicationNumber(records: any[]): any[] {
    const groupedRecords: any[] = [];
    const groupedMap: Map<string, any[]> = new Map();
  
    for (const record of records) {
      const applicationNumber = record.aNo;
      const servName = record.service_Name;
      const servD = record.service_dilivery_point;
      const is_completed= record.is_completed;
      const application_Status=record.application_Status;
      const recordNo=record.recordNo;
      const key = `${applicationNumber}_${servName}_${servD}_${is_completed}_${application_Status}_${recordNo}`;
  
      if (groupedMap.has(key)) {
        groupedMap.get(key).push(record);
      } else {
        groupedMap.set(key, [record]);
      }
    }
  
    groupedMap.forEach((groupedRecordsArray, key) => {
      const sortedRecords = groupedRecordsArray;
  
      const [applicationNumber, servName, servD,is_completed,application_Status,recordNo] = key.split('_');
      const group = {
        applicationNumber: applicationNumber,
        servName: servName,
        servD: servD,
        records: sortedRecords,
        is_completed:is_completed,
        application_Status:application_Status,
        recordNo:recordNo,

      };
  
      groupedRecords.push(group);
    });
  
    return groupedRecords;
  }
  getorg() {
    this.service.getorg().subscribe((org) => {
      this.Org = org;
      this.Org = this.Org.filter((value)=>
      value.organization_code !='3d26a10c-9be9-4261-bf97-ab6f39455ed3'&&
      value.organization_code !='275619f2-69c2-4fb7-a053-938f0b62b088'&&
      // value.organization_code !='1efb0336-26c6-4bf1-aeb8-8da0d4f7dbbb'&&
      value.organization_code !='5ef1475c-2b66-4087-b1b7-63e6c6cd7ca1'&&
      value.organization_code !='1809e356-d00f-42f9-8425-41a149dfd60f');
      
    

      console.log("this.Org", this.Org);
      console.log("this.Org", org);
    });
  }
  
  

  
 

  changePage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
    
console.log('this.paginatedUsers',this.paginatedUsers.length);

  
    // Calculate the pageRange based on the current page
    const rangeStart = Math.max(1, this.currentPage - 2);
    const rangeEnd = Math.min(rangeStart + 4, this.totalPages);
    this.pageRange = Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => rangeStart + i);
  }
  
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }
  
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }
  updatePageRange() {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);
    this.pageRange = Array.from({ length: (endPage - startPage) + 1 }, (_, i) => i + startPage);
  }
  check(){
    console.log('ischecked',this.Form.active);
    
  }
}
export class UserForm {
  public  id: any
  public subcity: any
  public woreda: number
  public userId: any
  public service_Id: any
  public active: any
  public applictaion_Number: any
}