import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'surveyNamePipe' })
export class SurveyNamePipe implements PipeTransform {

  transform(value: any[], args: string): any[] {
    let filter: string = args ? args.toLocaleLowerCase() : null;
    return filter ? value.filter((survey) => survey.surveyName.toLocaleLowerCase().startsWith(filter) != false) : value;
  }

}
