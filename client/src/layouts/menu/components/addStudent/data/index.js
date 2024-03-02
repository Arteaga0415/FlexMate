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
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { userServices } from "appServices";;
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function usersTableData() {

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
    { Header: "Email", accessor: "email", align: "left", width: "20%" },
    { Header: "Membership", accessor: "membership", align: "left", width: "10%" },
    { Header: "Type", accessor: "type", align: "center", width: "5%" },
    { Header: "Status", accessor: "status", align: "center", width: "5%" },
    { Header: "Belt", accessor: "belt", align: "center", width: "5%" },
    { Header: "Date", accessor: "date", align: "center", width: "5%" },
    { Header: "Gender", accessor: "gender", align: "center", width: "5%" },
    { Header: "Age", accessor: "age", align: "center", width: "5%" },
    { Header: "Classes", accessor: "classesinBelt", align: "center", width: "5%" },
  ];

  const rows = [
   { name: "Pedro",
    email: "pedroDeLaNoche@example.com",
    membership: "Monthly",
    type: "Begginer",
    status: true,
    belt: "white",
    date: new Date().toDateString(),
    gender: "Male",
    Age: 23,
    classesinBelt: 0,
  }
  ];
  

  return { columns, rows };
}
