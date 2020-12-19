import { Component, OnInit, ViewChild, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FormlyForm } from '@ngx-formly/core';
import { survey } from '../models/survey';
import { question } from '../models/question';
import { ErrorHandlingService } from '../services/error-handling.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { StepType } from '../models/stepType';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.css']
})
export class NewSurveyComponent implements OnInit, AfterViewInit {

  _surveyId: string;
  _survey: survey = new survey();
  title: string;
  _errorMessage: string;
  _successMessage: string;
  surveyDetailStepFunction:string;

  constructor(private router:Router,private surveyService: SurveyService, private errorHandlingService: ErrorHandlingService) { }
  form;
  options;
  surveyDetailForm;

  surveyDetailModel;
  newSurveyModel;
  steps: StepType[] = [];

  ngOnInit(): void {
    this.title = "Campaign Management System Create a New Survey";
    this.surveyDetailStepFunction="Create";
    this.surveyDetailForm = new FormGroup({});
    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
    this.options = this.steps.map(() => <FormlyFormOptions>{});
    this.newSurveyModel = {
      questionArray: [
        { question: '', expectedResponseType: '' }
      ]
    };
    this.surveyDetailModel = { surveyName: '', surveyDescription: '', numberOfQuestions: '', surveyEndDate: '' }
  }

  ngAfterViewInit(): void {
  }

  surveyDetailStep: StepType = {
    label: 'Survey Details',
    fields: [
      {
        key: 'surveyName',
        type: 'input',
        templateOptions: {
          label: 'Survey name',
          required: true,
        },
      },
      {
        key: 'surveyDescription',
        type: 'textarea',
        templateOptions: {
          type: 'textarea',
          label: 'Survey Description',
          required: true,
          rows: 5
        },
      },
      {
        key: 'numberOfQuestions',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Number of Questions',
          required: true,
          min: 1,
          max: 6
        },
      },
      {
        key: 'surveyEndDate',
        type: 'input',
        templateOptions: {
          type: 'date',
          label: 'Survey End Date',
          required: true,
        },
        validators: {
          validation: ['futureDate'],
        },
      }
    ]
  }

  surveyDetailsSubmit() {
    for (let i = 0; i < Number(this.surveyDetailModel.numberOfQuestions); i++) {
      this.steps[i] = {
        label: 'Question ' + (i + 1),
        fields: [
          {
            key: 'questionArray.' + (i) + '.question',
            type: 'input',
            templateOptions: {
              label: 'Question ' + (i + 1),
              required: true,
            },
          },
          {
            key: 'questionArray.' + (i) + '.expectedResponseType',
            type: 'select',
            defaultValue: 'text',
            templateOptions: {
              label: 'Expected Response Type',
              required: true,
              options: [
                { label: 'Single Line Text', value: 'text' },
                { label: 'Multi Line Text', value: 'textarea' },
                { label: 'Checkbox', value: 'checkbox' },
                { label: 'Dropdown', value: 'dropdown' }
              ]
            },
          },
          {
            key: 'questionArray.' + (i) + '.dropdownOption1',
            type: 'input',
            templateOptions: {
              label: '1st Dropdown Option',
              required: true,
            },
            hideExpression: 'model.questionArray[' + i + '].expectedResponseType!="dropdown"',
          },
          {
            key: 'questionArray.' + (i) + '.dropdownOption2',
            type: 'input',
            templateOptions: {
              label: '2nd Dropdown Option',
              required: true,
            },
            hideExpression: 'model.questionArray[' + i + '].expectedResponseType!="dropdown"',
          },
          {
            key: 'questionArray.' + (i) + '.dropdownOption3',
            type: 'input',
            templateOptions: {
              label: '3rd Dropdown Option',
              required: true,
            },
            hideExpression: 'model.questionArray[' + i + '].expectedResponseType!="dropdown"',
          },
          {
            key: 'questionArray.' + (i) + '.dropdownOption4',
            type: 'input',
            templateOptions: {
              label: '4th Dropdown Option',
              required: true,
            },
            hideExpression: 'model.questionArray[' + i + '].expectedResponseType!="dropdown"',
          },
        ]
      }
    }
    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
    this.options = this.steps.map(() => <FormlyFormOptions>{});
    this.surveyDetailStepFunction="Next";
  }

  finalSubmit() {
    this._survey.surveyName = this.surveyDetailModel.surveyName;
    this._survey.surveyDescription = this.surveyDetailModel.surveyDescription;
    this._survey.surveyEndDateTime = new Date(this.surveyDetailModel.surveyEndDate).getTime();
    this._survey.numberOfQuestions = Number(this.surveyDetailModel.numberOfQuestions);
    let _questionArray: question[] = [];
    for (let i = 0; i < this._survey.numberOfQuestions; i++) {
      _questionArray[i] = this.getQuestionfromModel(i);
    }
    this._survey.questions = _questionArray;
    this.surveyService.postSurvey(this._survey)
      .subscribe((data) => {
        this._surveyId = data;
        this._successMessage="Successfully created Survey with Id "+this._surveyId;
        alert(this._successMessage);
        this.router.navigateByUrl("/adminHome");
      },
        (error: HttpErrorResponse) => {
          this._errorMessage = this.errorHandlingService.handleError(error);
        });
  }

  getQuestionfromModel(i: number): question {
    let _question: question = new question();
    _question.question = this.newSurveyModel.questionArray[i].question;
    _question.expectedResponseType = this.newSurveyModel.questionArray[i].expectedResponseType;
    if (_question.expectedResponseType == "dropdown") {
      _question.options = [this.newSurveyModel.questionArray[i].dropdownOption1,
      this.newSurveyModel.questionArray[i].dropdownOption2,
      this.newSurveyModel.questionArray[i].dropdownOption3,
      this.newSurveyModel.questionArray[i].dropdownOption4]
    }
    return _question;
  }

  removeHttpError() {
    this._errorMessage = null;
  }

}
