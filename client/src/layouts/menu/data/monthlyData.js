/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-alert, indent, prettier/prettier */
/**
 Vic - here 
Sebastian Arteaga
I created this file to transform the weekly assistance response to on object of structure chartData
*/

export const transformHistoricalResponse = (monthlyAssistanceData) => {

  let dayCounts = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  monthlyAssistanceData.forEach(user => {
    Object.keys(dayCounts).forEach(day => {
      if (week[day]) {
        // Sum the number of sessions for the day across all users
        dayCounts[day] += week[day].reduce((acc, curr) => acc + curr.sessions.length, 0);
      }
    });
  });

  // Prepare the data structure for the chart
  const chartData = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: {
      label: "Sessions",
      data: [
        dayCounts.monday,
        dayCounts.tuesday,
        dayCounts.wednesday,
        dayCounts.thursday,
        dayCounts.friday,
        dayCounts.saturday,
        dayCounts.sunday
      ]
    }
  };

  return chartData;
};