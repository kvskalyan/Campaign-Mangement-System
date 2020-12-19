import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responseSubmittedTime'
})
export class ResponseSubmittedTimePipe implements PipeTransform {

  transform(value: any[], args1: any, args2: any): any[] {
    const regexYYYYMMDD=/\d{4}\-(0[1-9]|1[012])\-(0[1-9]|1[0-9]|2[0-9]|3[01])/;
    // console.log("Pipe Started");
    // console.log(args1);
    if(regexYYYYMMDD.test(String(args1)))
      args1=new Date(args1+"T00:00:00");
    let startDatefilter: number = args1 ? args1.getTime() : null;
    // console.log(startDatefilter);
    // console.log(args2);
    if(regexYYYYMMDD.test(String(args2)))
      args2=new Date(args2+"T23:59:59");
    let endDateFilter: number = args2 ? args2.getTime() : null;
    // console.log(endDateFilter);
    return (startDatefilter && endDateFilter) 
      ? value.filter((abstractResponse) => 
        startDatefilter<abstractResponse.responseTime && abstractResponse.responseTime<endDateFilter) 
      : value;
  }

}
