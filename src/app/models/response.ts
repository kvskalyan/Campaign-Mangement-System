import { answer } from './answer';

export class response{
	responseId:number;
	userId:number;
	surveyId:number;
	responseTime:number;
	answers: Array<answer>;
}