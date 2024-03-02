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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import MenuLayout from "../menu/layout";
import MenuNavbar from "../navbars/default";
// Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import usersTableData from "./data/usersTableData";
import dueMembershipData from "./data/dueMembershipData";

import MDButton from "components/MDButton";
import { useState } from "react"; 
import {  Menu, MenuItem } from '@mui/material';

function Tables() {
  //Kids class etc. 
  const [classType, setClassType] = useState(null); // For the anchor element
  const [selectedClass, setSelectedClass] = useState('Advanced'); // Default value
  const [open, setOpen] = useState(false);

  const handleClickClass = (event) => {
    setOpen(true);
    setClassType(event.currentTarget);
  };

  const handleCloseClass = (type) => () => {
    if (type) {
      setSelectedClass(type);
    }
    setOpen(false);
    setClassType(null);
  };

  const { columns, rows } = usersTableData();
  const { columns: pColumns, rows: pRows } = dueMembershipData();
  //old tables from which I based myself
  // const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <MenuLayout>
      <MenuNavbar />
      <MDBox>
        <MDButton onClick={handleClickClass} variant="contained" color="info" size="large" sx={{ ml: 2 }}>
          {selectedClass}
        </MDButton>
        <Menu
          id='resources-menu'
          anchorEl={classType}
          open={open}
          onClose={handleCloseClass('')}
        >
        <MenuItem onClick={handleCloseClass('Advanced')}>Advanced</MenuItem>
        <MenuItem onClick={handleCloseClass('Kids')}>Kids</MenuItem>
        <MenuItem onClick={handleCloseClass('Beginners')}>Beginners</MenuItem>
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
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
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
