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
import MDButton from "components/MDButton";
import { TextField, Menu, MenuItem } from "@mui/material";

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

  const MembershipComponent = ({ membership}) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDButton onClick={handleClickClass} variant="contained" color="info" size="large" sx={{ ml: 2 }}>
        {membership}
      </MDButton>
      <Menu
        anchorEl={classType}
        open={openClass}
        onClose={handleCloseClass('')}
      >
        <MenuItem onClick={handleCloseClass('Advanced')}>Advanced</MenuItem>
        <MenuItem onClick={handleCloseClass('Kids')}>Kids</MenuItem>
        <MenuItem onClick={handleCloseClass('Beginners')}>Beginners</MenuItem>
      </Menu>
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

  // const rows = [
  //  { name: "Pedro",
  //   email: "pedroDeLaNoche@example.com",
  //   membership: "Monthly",
  //   type: "Begginer",
  //   status: true,
  //   belt: "white",
  //   date: new Date().toDateString(),
  //   gender: "Male",
  //   Age: 23,
  //   classesinBelt: 0,
  //   }
  // ];
  const rows = [
   { name: <MembershipComponent membership={"Choose"} />,
    email: <TextField label='name' size='small' color='secondary' />,
    membership: <TextField label='name' size='small' color='secondary' />,
    type: <TextField label='name' size='small' color='secondary' />,
    status: <TextField label='name' size='small' color='secondary' />,
    belt: <TextField label='name' size='small' color='secondary' />,
    date: <TextField label='name' size='small' color='secondary' />,
    gender: <TextField label='name' size='small' color='secondary' />,
    age: <TextField label='name' size='small' color='secondary' />,
    classesinBelt: <TextField label='name' size='small' color='secondary' />,
    }
  ];
  

  return { columns, rows };
}
