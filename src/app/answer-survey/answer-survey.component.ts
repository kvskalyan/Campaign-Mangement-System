import { Component, OnInit } from '@angular/core';
import { survey } from '../models/survey';
import { SurveyService } from '../services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { StepType } from '../models/stepType';
import { UserService } from '../services/user.service';
import { user } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from '../services/error-handling.service';
import { FormlyFieldConfig, FormlyFormOptions, FormlyTemplateOptions } from '@ngx-formly/core';
import { question } from '../models/question';
import { response } from '../models/response';
import { answer } from '../models/answer';
import { ResponseService } from '../services/response.service';

@Component({
  selector: 'app-answer-survey',
  templateUrl: './answer-survey.component.html',
  styleUrls: ['./answer-survey.component.css']
})
export class AnswerSurveyComponent implements OnInit {

  dataId: number;
  title: string;
  _survey: survey;
  _questionArray: question[];
  userDetailStepFunction: string;

  _userId: number;
  _errorMessage: string;
  _successMessage: string;

  _responseId: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private surveyService: SurveyService,
    private responseService: ResponseService,
    private errorHandlingService: ErrorHandlingService) {
    this.route.params.subscribe(params => this.dataId = params.id);
    this.userDetailStepFunction = 'Answer Survey';
  }

  userDetailForm;
  answerSurveyForm;
  answerSurveyOptions;
  answerSurveyStep: StepType = { label: 'Answer Survey', fields: [] };

  userDetailModel;
  answerSurveyModel;

  ngOnInit(): void {
    this.title = "Answer Survey Details";
    this.surveyService.getSurvey(this.dataId)
      .subscribe((data) => {
        this._survey = data;
        this._questionArray = this._survey.questions;
      }, (error: HttpErrorResponse) => {
        this._errorMessage = this.errorHandlingService.handleError(error);
      });
    this.userDetailForm = new FormGroup({});
    this.userDetailModel = { userName: '', userEmail: '' };
    this.answerSurveyForm = new FormGroup({});
    this.answerSurveyOptions = <FormlyFormOptions>{};
    this.answerSurveyModel = { responseArray: [{ answer: "" }] };
  }

  userDetailStep: StepType = {
    label: 'User Details',
    fields: [
      {
        key: 'userName',
        type: 'input',
        templateOptions: {
          label: 'Your name',
          required: true,
        },
      },
      {
        key: 'userEmail',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Your Email',
          required: true
        },
        validators: {
          validation: ['email'],
        },
      }
    ]
  }

  userDetailsSubmit() {
    let _fields: FormlyFieldConfig[] = [];
    for (let i = 0; i < this._survey.numberOfQuestions; i++) {
      _fields[i] = this.getFields(i);
    }
    this.answerSurveyStep.fields = _fields;
    this.answerSurveyForm = new FormGroup({});
    this.answerSurveyOptions = <FormlyFormOptions>{};
    this.userDetailStepFunction = "Next";
  }

  getFields(i: number): FormlyFieldConfig {
    switch (this._questionArray[i].expectedResponseType) {
      case "text": return {
        key: 'responseArray.' + (i) + '.answer',
        type: 'input',
        templateOptions: {
          label: this._questionArray[i].question,
          required: true
        }
      }
      case "textarea": return {
        key: 'responseArray.' + (i) + '.answer',
        type: this._questionArray[i].expectedResponseType,
        templateOptions: {
          label: this._questionArray[i].question,
          type: this._questionArray[i].expectedResponseType,
          required: true,
          rows: 5
        }
      }
      case "checkbox": return {
        key: 'responseArray.' + (i) + '.answer',
        type: this._questionArray[i].expectedResponseType,
        defaultValue: "false",
        templateOptions: {
          label: this._questionArray[i].question,
          type: this._questionArray[i].expectedResponseType,
          indeterminate: false
        }
      }
      case "dropdown": return {
        key: 'responseArray.' + (i) + '.answer',
        type: 'select',
        defaultValue: this._questionArray[i].options[0],
        templateOptions: {
          label: this._questionArray[i].question,
          required: true,
          options: [
            { label: this._questionArray[i].options[0], value: this._questionArray[i].options[0] },
            { label: this._questionArray[i].options[1], value: this._questionArray[i].options[1] },
            { label: this._questionArray[i].options[2], value: this._questionArray[i].options[2] },
            { label: this._questionArray[i].options[3], value: this._questionArray[i].options[3] }
          ]
        }

      }
      default: return {}
    }
  }

  async finalSubmit() {
    await this.saveUser();
    this.saveResponse();

  }

  async saveUser() {
    let _user = new user();
    _user.userEmail = this.userDetailModel.userEmail;
    _user.userName = this.userDetailModel.userName;
    this._userId = await this.userService.createUser(_user).toPromise();
  }

  saveResponse() {
    let _response = new response();
    let _answerArray: answer[] = [];
    for (let i = 0; i < this._survey.numberOfQuestions; i++) {
      console.log(i);
      let _answer: answer = new answer();
      _answer.actualResponseType = this._questionArray[i].expectedResponseType;
      _answer.response = this.answerSurveyModel.responseArray[i].answer;
      if (_answer.actualResponseType == 'checkbox' && '' == _answer.response)
        _answer.response = "false";
      _answerArray[i] = _answer;
    }
    _response.answers = _answerArray;
    _response.surveyId = this._survey.surveyId;
    _response.userId = this._userId;
    this.responseService.postResponse(_response)
      .subscribe((data) => {
        this._responseId = data;
        this._successMessage = "Successfully Answered Survey with Response Id " + this._responseId;
        alert(this._successMessage);
        this.router.navigateByUrl("/survey");
      },
        (error: HttpErrorResponse) => {
          this._errorMessage = this.errorHandlingService.handleError(error);
        })
  }

  removeHttpError() {
    this._errorMessage = null;
  }
}
