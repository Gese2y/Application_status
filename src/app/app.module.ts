import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { RecordComponent } from './record/record.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ServiceServiceService } from './service-service.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from "primeng/fileupload";
import { TableModule } from 'primeng/table';
import { TabsModule } from "ngx-bootstrap/tabs";
import {TabViewModule} from 'primeng/tabview';
import { SimpleNotificationsComponent, SimpleNotificationsModule } from "angular2-notifications";
import { DialogModule } from "primeng/dialog";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { FilesComponent } from "./files/files.component";
import { ListboxModule } from 'primeng/listbox';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { LoadingBarInterceptor } from './loading-bar/loading-bar-interceptor';
import { LoadingBarService } from './loading-bar/loading-bar.service';
import { DatepickerEthiopianDirective } from './datepicker-ethiopian.directive';

// import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { NgxCaptureModule } from 'ngx-capture';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { ProcessedApplicationComponent } from './processed-application/processed-application.component';
import { RejectedApplicationComponent } from './rejected-application/rejected-application.component';

@NgModule({
  declarations: [
    AppComponent,
    // RecordComponent,
    // FilesComponent,
    LoadingBarComponent,
    DatepickerEthiopianDirective,
    // UserRegistrationComponent,
    ApplicationStatusComponent,
    ProcessedApplicationComponent,
    RejectedApplicationComponent
    
  ],
  imports: [
    DialogModule,
    ListboxModule,
    ProgressSpinnerModule,
    SimpleNotificationsModule.forRoot(),
    TabsModule.forRoot(),
    FileUploadModule,
    TabViewModule ,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgxCaptureModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    ModalModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    })
    
  ],
  exports: [
    // FilesComponent,
  ],
  providers: [ServiceServiceService, BsModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingBarInterceptor,
      multi: true,
    },
    LoadingBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.phisicalPath, ".json");
}
