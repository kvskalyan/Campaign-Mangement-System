import { question } from './question';

export class survey{
	surveyId:number;
	surveyName:string;
	surveyDescription:string;
	surveyStartDateTime: number;
	surveyEndDateTime: number;
	numberOfQuestions:number;
	questions: Array<question>;
	numberOfResponses:number;
	surveyStatus:string;
}