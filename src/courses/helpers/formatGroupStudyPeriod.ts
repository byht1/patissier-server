import * as date from 'date-and-time';
import { EMonths, EWeekDays } from './translation';

export const formatDate = (periodDate: string) => {
  const [twoDigitDay, monthName, weekDay] = date.format(new Date(periodDate), 'DD MMMM dddd').split(' ');
  const formatedDate = `${twoDigitDay} ${EMonths[monthName]}, ${EWeekDays[weekDay]}`;
  //   if (formatedDate.includes('undefined')) {
  //     return 'Invalid Date';
  //   }

  //   console.log('🚀 ~ formatedDate:', formatedDate);

  return formatedDate;
};
