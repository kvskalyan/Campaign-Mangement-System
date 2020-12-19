import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../services/survey.service';
import { survey } from '../models/survey';
import { ResponseService } from '../services/response.service';
import { abstractResponse } from '../models/abstractResponse';
import { response } from '../models/response';
import { ExcelService } from '../services/excel.service';
import { excelObject } from '../models/excelObject';
import { DatePipe } from '@angular/common';
import { ResponseUserNamePipe } from '../pipes/response-user-name.pipe';
import { ResponseUserEmailPipe } from '../pipes/response-user-email.pipe';
import { ResponseSubmittedTimePipe } from '../pipes/response-submitted-time.pipe';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {

  dataId: number;
  title: string;
  _survey: survey;
  _abstractResponses: abstractResponse[] = [];
  _responses: response[] = [];

  nameFilter: string = "";
  emailFilter: string = "";
  startDateFilter: Date;
  endDateFilter: Date;

  constructor(private route: ActivatedRoute,
    private surveyService: SurveyService,
    private responseService: ResponseService,
    private excelService: ExcelService,
    private datePipe: DatePipe,
    private responseUserNamePipe: ResponseUserNamePipe,
    private responseUserEmailPipe: ResponseUserEmailPipe,
    private responseSubmittedTimePipe: ResponseSubmittedTimePipe) {
    this.route.params.subscribe(params => this.dataId = params.id);
  }

  async ngOnInit(): Promise<void> {
    this.title = "View Survey Details";
    this.nameFilter = "";
    this.emailFilter = "";
    this.startDateFilter = new Date(0);
    this.endDateFilter = new Date();
    await this.getSurvey();
    this.getAllResponses();
  }


  private async getAllResponses() {
    this._abstractResponses = await this.responseService.getResponses(this._survey.surveyId).toPromise()
  }

  private async getSurvey() {
    this._survey = await this.surveyService.getSurvey(this.dataId).toPromise();
  }

  async exportAsXLSX() {
    await this.responseService.getCompleteResponses(this._survey.surveyId)
      .toPromise().then((data) => {
        this._responses = data;
      });
    let excelJson = await this.prepareExcelJson();
    this.excelService.exportAsExcelFile(excelJson, "Survey " + this._survey.surveyName + " Responses");
  }

  prepareExcelJson(): any[] {
    let excelData: excelObject[] = [];
    // Applying submitted time Pipe
    this._responses = this.responseSubmittedTimePipe.transform(this._responses, this.startDateFilter, this.endDateFilter);
    this._responses.forEach((response, index) => {
      let _excelObject: excelObject = new excelObject();
      let _aResponse = this._abstractResponses.filter(_aResponse => _aResponse.responseId == response.responseId)[0];
      _excelObject.ResponseId = response.responseId;
      _excelObject.UserName = _aResponse.userName;
      _excelObject.UserEmail = _aResponse.userEmail;
      this.setAnswers(response, _excelObject);
      _excelObject.ResponseTime = this.datePipe.transform(new Date(response.responseTime), 'medium');
      excelData[index] = _excelObject;
    })
    excelData = this.responseUserNamePipe.transformExcelData(excelData, this.nameFilter);
    excelData = this.responseUserEmailPipe.transformExcelData(excelData, this.emailFilter);
    return excelData;
  }

  setAnswers(response: response, _excelObject: excelObject) {
    response.answers.forEach((answer, index) => {
      switch (index + 1) {
        case 1: {
          _excelObject.Question_1_Answer = answer.response;
          break;
        }
        case 2: {
          _excelObject.Question_2_Answer = answer.response;
          break;
        }
        case 3: {
          _excelObject.Question_3_Answer = answer.response;
          break;
        }
        case 4: {
          _excelObject.Question_4_Answer = answer.response;
          break;
        }
        case 5: {
          _excelObject.Question_5_Answer = answer.response;
          break;
        }
        case 6: {
          _excelObject.Question_6_Answer = answer.response;
          break;
        }
        default: break;
      }
    })
  }

}
