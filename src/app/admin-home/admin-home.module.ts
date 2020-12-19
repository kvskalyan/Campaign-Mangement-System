import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminHomeComponent } from './admin-home.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ViewSurveyComponent } from '../view-survey/view-survey.component';
import { NewSurveyComponent } from '../new-survey/new-survey.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { futureDateValidator, minlengthValidationMessage, maxlengthValidationMessage, minValidationMessage, maxValidationMessage } from '../services/validationService';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ViewResponseComponent } from '../view-response/view-response.component';
import { SurveyNamePipe } from '../pipes/survey-name.pipe';
import { ResponseUserNamePipe } from '../pipes/response-user-name.pipe';
import { ResponseUserEmailPipe } from '../pipes/response-user-email.pipe';
import { ResponseSubmittedTimePipe } from '../pipes/response-submitted-time.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    AdminHomeComponent,
    ViewSurveyComponent,
    NewSurveyComponent,
    ViewResponseComponent,
    SurveyNamePipe,
    ResponseUserNamePipe,
    ResponseUserEmailPipe,
    ResponseSubmittedTimePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'futureDate', validation: futureDateValidator },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'futureDate', message: 'Please enter a Future Date' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
      ],
      // types: [
      //   { name: 'customTextarea', component: FormlyFieldCustomInput},
      // ],
    }),
    NgxChartsModule
  ],
  providers: [DatePipe, ResponseUserNamePipe, ResponseUserEmailPipe, ResponseSubmittedTimePipe],
  bootstrap: [AdminHomeComponent]
})
export class AdminHomeModule { }
