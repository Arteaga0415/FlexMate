/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-alert, indent, prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import MenuLayout from "../menu/layout";
import MenuNavbar from "../navbars/assistance";
// Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
import usersTableData from "./data/usersTableData";
import dueMembershipData from "./data/dueMembershipData";

import MDButton from "components/MDButton";
import { useState } from "react"; 
import {  Menu, MenuItem } from '@mui/material';
import { useMaterialUIController, setClassTerm, setTimeTerm } from "context";
import { useLocation } from 'react-router-dom';

function Tables() {
  const location = useLocation();
  const [classType, setClassType] = useState(null);
  const [selectedClass, setSelectedClass] = useState('Advanced');
  const [openClass, setOpenClass] = useState(false);
  const [selectedTime, setSelectedTime] = useState('6am');
  const [time, setTime] = useState(null);
  const [openTime, setOpenTime] = useState(false);
  const { columns, rows } = usersTableData();
  const { columns: pColumns, rows: pRows } = dueMembershipData();
  const [{ searchTerm }] = useMaterialUIController();
  const [dispatch] = useMaterialUIController();

  let filteredRows;
  if (searchTerm.length > 0 && location.pathname.endsWith("/assistance")) {
    filteredRows = rows.filter(row => {
      // return console.log(row.name.props.name);
      return row.name.props.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    // console.log('Filtered Rows: ', filteredRows);
  }

  //For class type 
  const handleClickClass = (event) => {
    setOpenClass(true);
    setClassType(event.currentTarget);
    // setClassTerm(dispatch, event.currentTarget);
  };
  const handleCloseClass = (type) => () => {
    if (type) {
      setSelectedClass(type);
    }
    setOpenClass(false);
    setClassType(null);
  };
  //For the time of class 
  const handleClickTime = (event) => {
    setOpenTime(true);
    setTime(event.currentTarget);
    // setTimeTerm(dispatch, event.currentTarget);
  };
  const handleCloseTime = (type) => () => {
    if (type) {
      setSelectedTime(type);
    }
    setOpenTime(false);
    setTime(null);
  };

  return (
  <MenuLayout>
    <MenuNavbar />
    <MDBox>
      <MDButton onClick={handleClickClass} variant="contained" color="info" size="large" sx={{ ml: 2 }}>
        {selectedClass}
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
      <MDButton onClick={handleClickTime} variant="contained" color="info" size="large" sx={{ ml: 2 }}>
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
      </Menu>
    </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Assistance
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: columns,
                    rows: filteredRows ? filteredRows : rows,
                  }}
                  isSorted={false}
                  // entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Due Membership
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </MenuLayout>
  );
}

export default Tables;
