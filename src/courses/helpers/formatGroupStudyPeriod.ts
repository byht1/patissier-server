import * as date from 'date-and-time';
import { EMonths, EWeekDays } from './translation';

export const formatStudyPeriod = (periodDate: string) => {
  const [twoDigitDay, monthName, weekDay] = date.format(new Date(periodDate), 'DD MMMM dddd').split(' ');
  const formattedDate = `${twoDigitDay} ${EMonths[monthName]}, ${EWeekDays[weekDay]}`;

  if (formattedDate.includes('undefined')) {
    return 'Invalid date';
  }

  // console.log('🚀 ~ formattedDate:', formattedDate);

  return formattedDate;
};
