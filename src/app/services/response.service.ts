import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from '../models/response';
import { Observable } from 'rxjs';
import { abstractResponse } from '../models/abstractResponse';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  host: string = "http://localhost:8080/response";

  saveResponseUri: string = "/saveResponse";
  allResponsesUri: string = "/allResponses";
  allCompleteResponsesUri: string = "/allCompleteResponses";


  constructor(private http: HttpClient) { }

  postResponse(_response: response): Observable<string> {
    let finalUrl = String.prototype.concat(this.host, this.saveResponseUri);
    return this.http.post<string>(finalUrl, _response);
  }

  getResponse(_surveyId: number, _responseId: number): Observable<response> {
    let finalUrl = String.prototype.concat(this.host);
    return this.http.get<response>(finalUrl, {
      params: {
        surveyId: _surveyId.toString(),
        responseId: _responseId.toString()
      }
    });
  }

  getResponses(_surveyId: number): Observable<abstractResponse[]> {
    let finalUrl = String.prototype.concat(this.host, this.allResponsesUri)
    return this.http.get<abstractResponse[]>(finalUrl, {
      params: {
        surveyId: _surveyId.toString()
      }
    });
  }

  getCompleteResponses(_surveyId: number): Observable<response[]> {
    let finalUrl = String.prototype.concat(this.host,this.allCompleteResponsesUri);
    return this.http.get<response[]>(finalUrl, {
      params: {
        surveyId: _surveyId.toString()
      }
    });
  }
}
