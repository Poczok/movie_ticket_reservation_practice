import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'displayDates'
})
export class DisplayDatesPipe implements PipeTransform {
  transform(value: { [key: string]: string[]}): string[] {
    if (value === null || value === undefined) {
      return null;
    }
    return Object.entries(value).reduce((acc, curr) => {
      const concatTimes = (curr[1] as any[]).reduce((a, c, i) => {
          if(i === (curr[1] as string[]).length - 1) {
            return a + `${c}`;
          } else {
            return a + `${c}, `;
          }
      }, '');
      return [... acc, `${curr[0]}: ${concatTimes}`];
    }, []);
  }
}
