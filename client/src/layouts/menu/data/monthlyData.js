/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-alert, indent, prettier/prettier */

import { parseISO, format } from 'date-fns';

export const transformHistoricalResponse = (historicalAssistanceData) => {
  const monthCounts = {"Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0, "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0};

  historicalAssistanceData.forEach(user => {
    user.detailedHistory.forEach(session => {
      const month = format(parseISO(session.date), 'MMM');
      for (let el in monthCounts) {
        // console.log("element: ", el);
        if (month === el) {
          monthCounts[month]+=1;
          //console.log('Here: ', typeof month);
          //console.log('Here count: ', monthCounts[month]);
        }
      }
    });
  });

  const chartData = {
    labels: Object.keys(monthCounts),
    datasets: {
      label: 'Monthly Attendance',
      data: [
        monthCounts["Jan"],
        monthCounts["Feb"],
        monthCounts["Mar"],
        monthCounts["Apr"],
        monthCounts["May"],
        monthCounts["Jun"],
        monthCounts["Jul"],
        monthCounts["Aug"],
        monthCounts["Sep"],
        monthCounts["Oct"],
        monthCounts["Nov"],
        monthCounts["Dec"],
      ],
    }
  };

  return chartData;
};
