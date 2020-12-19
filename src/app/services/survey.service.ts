import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { survey } from '../models/survey';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  host: string = "http://localhost:8080/survey";

  allSurveysUri: string = "/allSurveys";
  createSurveyUri: string = "/createSurvey";

  constructor(private http: HttpClient) { }

  getAllSurveys(): Observable<survey[]> {
    let finalUrl = String.prototype.concat(this.host, this.allSurveysUri);
    return this.http.get<survey[]>(finalUrl);
  }

  getSurvey(_surveyId: number): Observable<survey> {
    let finalUrl = String.prototype.concat(this.host)
    return this.http.get<survey>(finalUrl, {
      params: {
        surveyId: _surveyId.toString()
      }
    });
  }

  postSurvey(_survey: survey): Observable<string> {
    let finalUrl = String.prototype.concat(this.host, this.createSurveyUri);
    return this.http.post<string>(finalUrl, _survey);
  }
}
