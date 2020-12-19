import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyComponent } from './survey/survey.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { AnswerSurveyComponent } from './answer-survey/answer-survey.component';
import { ViewResponseComponent } from './view-response/view-response.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'survey', component: SurveyComponent},
  { path: 'survey/:id', component: AnswerSurveyComponent},
  { path:'adminHome', 
          children:[
            {path:'', component:AdminHomeComponent},
            {path:'logout', redirectTo: '/login',pathMatch:'full'},
            {path:'survey/:id', component:ViewSurveyComponent},
            {path:'newSurvey',component:NewSurveyComponent},
            {path:'survey/:id1/response/:id2', component:ViewResponseComponent}
          ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
