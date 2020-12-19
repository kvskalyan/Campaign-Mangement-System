import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AdminHomeModule } from './admin-home/admin-home.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { AnswerSurveyComponent } from './answer-survey/answer-survey.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { futureDateValidator, minlengthValidationMessage, maxlengthValidationMessage, minValidationMessage, maxValidationMessage, emailValidator } from './services/validationService';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    LoginComponent,
    AnswerSurveyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AdminHomeModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'futureDate', validation: futureDateValidator },
        { name: 'email', validation: emailValidator },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'futureDate', message: 'Please enter a Future Date' },
        { name:'email', message:'Please enter a valid email'},
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
      ],
      // types: [
      //   { name: 'customTextarea', component: FormlyFieldCustomInput},
      // ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
