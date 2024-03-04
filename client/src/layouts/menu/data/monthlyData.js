/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-alert, indent, prettier/prettier */
/**
 Vic - here 
Sebastian Arteaga
I created this file to transform the weekly assistance response to on object of structure chartData
*/

export const transformWeeklyResponse = (weeklyAssistanceData) => {

  let dayCounts = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  };

  weeklyAssistanceData.forEach(week => {
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