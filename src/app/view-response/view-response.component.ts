import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from '../services/response.service';
import { response } from '../models/response';
import { survey } from '../models/survey';
import { SurveyService } from '../services/survey.service';
import { user } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-response',
  templateUrl: './view-response.component.html',
  styleUrls: ['./view-response.component.css']
})
export class ViewResponseComponent implements OnInit {

  surveyId: number;
  responseId: number;
  title: string;

  _response: response;
  _survey: survey;
  _userDetails: user;

  constructor(private route: ActivatedRoute,
    private responseService: ResponseService,
    private surveyService: SurveyService,
    private userService: UserService) {
    this.route.params.subscribe(params => this.surveyId = params.id1);
    this.route.params.subscribe(params => this.responseId = params.id2);
  }

  async ngOnInit(): Promise<void> {
    this.title = "View Response";
    await this.getResponse();
    await this.getSurvey();
    await this.getUserNameAndEmail();
  }

  private async getUserNameAndEmail() {
    this._userDetails = await this.userService.getUserNameAndEmail(this._response.userId).toPromise();
  }

  private async getSurvey() {
    this._survey = await this.surveyService.getSurvey(this.surveyId).toPromise();
  }


  private async getResponse() {
    this._response = await this.responseService.getResponse(this.surveyId, this.responseId).toPromise();
  }
}
