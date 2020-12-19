import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  _surveyId:string="";

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  answerSurvey(event:any){
    this.router.navigateByUrl("survey/"+this._surveyId);
  }

}
