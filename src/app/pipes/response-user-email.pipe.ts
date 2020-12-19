import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responseUserEmail'
})
export class ResponseUserEmailPipe implements PipeTransform {

  transform(value: any[], args: string): any[] {
    let filter: string = args ? args.toLocaleLowerCase() : null;
    return filter ? value.filter((abstractResponse) => abstractResponse.userEmail.toLocaleLowerCase().startsWith(filter) != false) : value;
  }

  transformExcelData(value: any[], args: string):any[]{
    let filter: string = args ? args.toLocaleLowerCase() : null;
    return filter ? value.filter((excelObject) => excelObject.UserEmail.toLocaleLowerCase().startsWith(filter) != false) : value;
  }

}
