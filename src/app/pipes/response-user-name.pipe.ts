import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responseUserName'
})
export class ResponseUserNamePipe implements PipeTransform {

  transform(value: any[], args: string): any[] {
    let filter: string = args ? args.toLocaleLowerCase() : null;
    return filter ? value.filter((abstractResponse) => abstractResponse.userName.toLocaleLowerCase().startsWith(filter) != false) : value;
  }

  transformExcelData(value: any[], args: string):any[]{
    let filter: string = args ? args.toLocaleLowerCase() : null;
    return filter ? value.filter((excelObject) => excelObject.UserName.toLocaleLowerCase().startsWith(filter) != false) : value;
  }

}
