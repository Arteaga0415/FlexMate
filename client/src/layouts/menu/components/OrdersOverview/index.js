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

function OrdersOverview(userList) {
  const [studentHistory, setStudentHistory] = useState({});
  const [student, setStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("Advanced");
  const [openStudent, setOpenStudent] = useState(false);
  const [id, setId] = useState(null);

  // useEffect(() => {
  // }, []);
  const fetchStudent = async (id) => {
    if (id) {
      const fetchedStudent = await userServices.fetchOneHistorical(`${id}`);
      if (fetchedStudent) {
        setStudentHistory(fetchedStudent);
        // console.log("User type List: ", typeof userList);
        // console.log("User List: ", userList);
      }
    }
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
      <MDBox pt={3} px={3}>
        <MDBox>
          <MDButton onClick={handleClickStudent} variant="contained" color="info" size="large" >
            {selectedStudent}
          </MDButton>
          <Menu
            anchorEl={student}
            open={openStudent}
            onClose={handleCloseStudent('')}
          >
            {/* <MenuItem onClick={handleCloseStudent('Advanced')}>Advanced</MenuItem> */}
            {/* <MenuItem onClick={handleCloseStudent('Kids')}>Kids</MenuItem>
            <MenuItem onClick={handleCloseStudent('Beginners')}>Beginners</MenuItem> */}
             { userList.userList.map((user) => (
              <MenuItem key={user._id} onClick={handleCloseStudent(user.name, user._id)}>
                {user.name}
              </MenuItem>
            ))}
          </Menu>
          {/* <MDButton onClick={handleClickTime} variant="contained" color="info" size="large" sx={{ ml: 2 }}>
            {selectedTime}
          </MDButton>
          <Menu
            anchorEl={time}
            open={openTime}
            onClose={handleCloseTime('')}
          >
            <MenuItem onClick={handleCloseTime('6am')}>6AM</MenuItem>
            <MenuItem onClick={handleCloseTime('6pm')}>6PM</MenuItem>
            <MenuItem onClick={handleCloseTime('7pm')}>7PM</MenuItem>
          </Menu> */}
        </MDBox>
        <MDTypography variant="h6" fontWeight="medium">
          {studentHistory.name ? studentHistory.name : "Select Student"}
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="$2400, Design changes"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="New order #1832412"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="Server payments for April"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="New card added for order #4395133"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
