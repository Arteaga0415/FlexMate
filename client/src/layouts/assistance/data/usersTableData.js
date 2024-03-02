/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-alert, indent, prettier/prettier */
/**
 Vic - here 
Sebastian Arteaga
I created this data using the authorsTablesData as a guide
*/

// Import React and useState, useEffect hooks
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { userServices } from "../../../appServices";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function usersTableData() {
  const [users, setUsers] = useState([]);
  //Fetch request for the users
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await userServices.fetchUsers();
      if (fetchedUsers) {
        setUsers(fetchedUsers);
      }
    };
    fetchUsers();
  }, []);
  //Helper functions 
  const getCurrentDay = () => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return days[new Date().getDay()];
  };
  const getMondayOfCurrentWeek = () => {
    const date = new Date();
    //get the day of the week
    const day = date.getDay();
    //get the diference to determine the monday with of the month :date.getDate()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // since .getDay() returns 0 for sunday we have to do this
    return new Date(date.setDate(diff)).toISOString().split('T')[0]; // Extract the YYYY-MM-DD
  };  
  const handleAddWeekly = (weekStartDate, userId, day, sessions) => {
    const postData = {
      weekStartDate,
      day,
      userId,
      sessions,
    };
    //console.log("Data to post: ", postData);
    userServices.postWeeklyAssistance(postData)
    .then((result) => {
        if (result) {
          alert("Weekly assistance posted successfully");
        }
      })
      .catch((error) => {
        console.error("Failed to post weekly assistance", error);
      });
  };

  const UserComponent = ({ name, belt }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{belt}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const MembershipComponent = ({ membership, status }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {membership}
      </MDTypography>
      <MDTypography variant="caption">{status ? "Active" : "Inactive"}</MDTypography>
    </MDBox>
  );

  const EmailComponent = ({ email }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {email}
      </MDTypography>
    </MDBox>
  );

  const TypeComponent = ({ type }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {type}
      </MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "Name", accessor: "name", align: "left", width: "35%" },
    { Header: "Email", accessor: "email", align: "left" },
    { Header: "Membership", accessor: "membership", align: "left", width: "10%" },
    { Header: "Type", accessor: "type", align: "center", width: "5%" },
    { Header: "Status", accessor: "status", align: "center", width: "5%" },
    { Header: "Action", accessor: "action", align: "center", width: "5%" },
    { Header: "Add", accessor: "add", align: "center", width: "5%" },
  ];

  const rows = users.map((user) => ({
    name: <UserComponent name={user.name} belt={user.belt} />,
    email: <EmailComponent email={user.email} />,
    membership: <MembershipComponent membership={user.membership} status={user.status} />,
    type: <TypeComponent type={user.type} />,
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={user.status ? "Active" : "Inactive"}
          color={user.status ? "success" : "secondary"}
          variant="gradient"
          size="md"
        />
      </MDBox>
    ),
    action: (
      //yet to make a put request to modify the contents. 
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        Edit
      </MDTypography>
    ),
    add: (
      <IconButton
        onClick={() =>
          handleAddWeekly(
            getMondayOfCurrentWeek(),
            user._id,
            getCurrentDay(),
            [
              { sessionType: "advanced Class" },
              { sessionType: "Sparring Session" },
            ]
          )
        }
      >
      <AddCircleOutlineIcon />
      </IconButton>
      ),
  }));

  return { columns, rows };
}
