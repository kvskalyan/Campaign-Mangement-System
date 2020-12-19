import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { survey } from '../models/survey';
import { allSurveysChartModel } from '../models/allSurveysChartModel';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  title: string;
  allSurveys: survey[];
  nameFilter: string = "";
  chartData: allSurveysChartModel[] = [];
  
  constructor(private surveyService: SurveyService) { }

  view: any[] = [700, 500];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Surveys';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Number of Responses';
  legendTitle: string = 'Surveys';
  colorScheme = {
    domain: ['#F08080','#5AA454', '#A10A28', '#00FFFF', '#AAAAAA']
  };

  async ngOnInit() {
    this.title = "Campaign Management System Home Page";
    await this.surveyService.getAllSurveys()
      .toPromise().then((data) => {
        this.allSurveys = data;
      });
    this.allSurveys.forEach((survey, index) => {
      let _allSurveysChartModel = new allSurveysChartModel();
      _allSurveysChartModel.name = survey.surveyName;
      _allSurveysChartModel.value = survey.numberOfResponses;
      this.chartData[index] = _allSurveysChartModel;
    });
    this.chartData = [...this.chartData];    
  }

}
