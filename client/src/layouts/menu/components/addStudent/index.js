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

/**
 Vic - here 
Sebastian Arteaga
I copied this from a table from the template and am working on changing it to accept text fields and use this to post a new user. 
Just review the data/index.js
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "./data";
import MDButton from "components/MDButton";
import { Stack, TextField } from "@mui/material";

function AddStudent() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  //For membership
  const [membershipType, setMembershipType] = useState(null);
  const [selectedMembership, setSelectedMembership] = useState('Advanced');
  const [openMembership, setOpenMembership] = useState(false);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMembership = (
    <Menu
      id="membership-menu"
      anchorEl={menu}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Full</MenuItem>
      <MenuItem onClick={closeMenu}>Annual</MenuItem>
      <MenuItem onClick={closeMenu}>Regular</MenuItem>
    </Menu>
  );

  const handleClickMembership = (event) => {
    setOpenMembership(true);
    setMembershipType(event.currentTarget);
  };
  const handleCloseMembership = (type) => () => {
    if (type) {
      setSelectedMembership(type);
    }
    setOpenMembership(false);
    setMembershipType(null);
  };

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Add New Student 
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>30 done</strong> this month
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox sx={{marginLeft: '25px', overflowY: 'auto'}}>
        {/* <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        /> */}
        <Stack spacing={3} direction='column' >
          <TextField label='Name' variant='outlined' sx={{ maxWidth: '200px', }} />
          <TextField label='Email' variant='outlined' sx={{ maxWidth: '200px', }} />
          <MDBox color="text" >
            <MDButton onClick={handleClickMembership} variant="contained" color="info" size="large" sx={{ ml: 2 }}>
              {selectedMembership}
            </MDButton>
            <Menu
              anchorEl={membershipType}
              open={openMembership}
              onClose={handleCloseMembership('')}
            >
              <MenuItem onClick={handleCloseMembership('Advanced')}>Advanced</MenuItem>
              <MenuItem onClick={handleCloseMembership('Kids')}>Kids</MenuItem>
              <MenuItem onClick={handleCloseMembership('Beginners')}>Beginners</MenuItem>
            </Menu>
          </MDBox>
          <TextField label='Type' variant='outlined' sx={{ maxWidth: '200px', }} />
          {/* <TextField label='Status' variant='outlined' /> */}
          {/* <TextField label='Belt' variant='outlined' /> */}
          {/* <TextField label='Date' variant='outlined' /> */}
          <TextField label='Gender' variant='outlined' sx={{ maxWidth: '200px', }} />
          <TextField label='Age' variant='outlined' sx={{ maxWidth: '200px', }} />
          {/* <TextField label='Classes in belt' variant='outlined' /> */}
        </Stack>
        <MDButton variant="contained" color="info" size="large">
          Submit
        </MDButton>
      </MDBox>
    </Card>
  );
}

export default AddStudent;
