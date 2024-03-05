/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-alert, indent, prettier/prettier */

/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { userServices } from "appServices";
import { useState, useEffect } from "react";
import MDButton from "components/MDButton";
import {  Menu, MenuItem } from '@mui/material';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { parseISO, format } from 'date-fns';
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import { transformHistoricalResponse } from "layouts/menu/data/monthlyData";
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';

function OrdersOverview({ userList }) {
  const [studentHistory, setStudentHistory] = useState({});
  const [student, setStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("Student");
  const [openStudent, setOpenStudent] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [studentThisWeek, setStudentThisWeek] = useState({});
  const [weekChart, setWeekChart] = useState({
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{ label: "Sessions", data: [0, 0, 0, 0, 0, 0, 0] }], 
  });
  useEffect(() => {
    // console.log('weekChart: ', weekChart);
    // console.log('userList: ', userList);
    console.log('Date today Day?: ', format(new Date(), 'i'));
    // console.log('Date today Day?: ', (new Date()).getDay());
  }, []);

  let chartData = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: {
      label: "Sessions",
      data: [
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ]
    }
  };
  const fetchStudent = async (id) => {
    if (id) {
      const fetchedStudent = await userServices.fetchOneHistorical(`${id}`);
      if (fetchedStudent) {
        setStudentHistory(fetchedStudent);
        setDisplayInfo(true);
        // console.log("User type List: ", typeof userList);
        //console.log("User fetched: ", fetchedStudent);
        const userThisWeek = fetchedStudent.detailedHistory.filter(user => {
          // console.log("Condition: ", user.date >= getMondayOfCurrentWeek());
          return user.date >= getMondayOfCurrentWeek();
        });
        // console.log('users this week: ', userThisWeek);
        setStudentThisWeek(userThisWeek);
        // Set the chart data for the student 
        //To get the position format(new Date(), 'i')
        chartData.datasets.data[format(new Date(), 'i') - 1] = userThisWeek.length;
        setWeekChart(chartData);
      } else {
        setDisplayInfo(false)
        chartData.datasets.data[format(new Date(), 'i') - 1] = 0;
        setWeekChart(chartData);
      }
    }
  };

  const getMondayOfCurrentWeek = () => {

    const date = new Date();
    //get the day of the week
    const day = date.getDay();
    //get the diference to determine the monday with of the month :date.getDate()
    // since .getDay() returns 0 for sunday we have to do this
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    // Extract the YYYY-MM-DD
    return new Date(date.setDate(diff)).toISOString().split('T')[0];
  };  

  const handleClickStudent = (event) => {
    setOpenStudent(true);
    setStudent(event.currentTarget)
  };
  const handleCloseStudent = (student, id) => () => {
    if (student) {
      setSelectedStudent(student);
    }
    setOpenStudent(false);
    setStudent(null);
    fetchStudent(id);
    // console.log("Student: ", student);
    // console.log("ID: ", id);
    // console.log("Selected Student: ", selectedStudent);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3} ml={2} >
        <MDBox mb={2} >
          <MDButton onClick={handleClickStudent} variant="contained" color="info" size="large" >
            {selectedStudent}
          </MDButton>
          <Menu
            anchorEl={student}
            open={openStudent}
            onClose={handleCloseStudent('')}
          >
             { userList.map((user) => (
              <MenuItem key={user._id} onClick={handleCloseStudent(user.name, user._id)}>
                {user.name}
              </MenuItem>
            ))}
          </Menu>
        </MDBox>
        <MDTypography variant="h6" fontWeight="medium">
          {displayInfo ? studentHistory.belt : "Select Student"}
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              {displayInfo ? studentHistory.detailedHistory.length : "0"}
            </MDTypography>{" "}
            Clases in belt
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox ml={2} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
        <MDBox p={2}>
          <TimelineItem
            color="info"
            icon=<SportsKabaddiIcon></SportsKabaddiIcon>
            title={displayInfo ? `${studentHistory.detailedHistory.length} Classes in Belt`: "0 Classes in Belt"}
            dateTime={format(new Date(), 'd MMM yyyy')}
          />
          <TimelineItem
            color="error"
            icon=<SportsMartialArtsIcon></SportsMartialArtsIcon>
            title={displayInfo ? `${studentThisWeek.length} Classes this week`: "0 Classes this week"}
            dateTime={format(new Date(), 'd MMM yyyy')}
          />
          <TimelineItem
            color="info"
            icon="shopping_cart"
            title={`Payments for ${format(new Date(), 'MMMM')}`}
            dateTime={format(new Date(), 'd MMM yyyy')}
          />
          <TimelineItem
            color="info"
            icon="shopping_cart"
            title={`Payments for ${format(new Date(), 'MMMM')}`}
            dateTime={format(new Date(), 'd MMM yyyy')}
          />
        </MDBox>
        <MDBox ml={10}>
          <ReportsBarChart
            color="info"
            title={selectedStudent}
            description={`${selectedStudent} Attendance`}
            date="This Week"
            chart={weekChart} 
          />
        </MDBox>
      </MDBox>

    </Card>
  );
}

export default OrdersOverview;
