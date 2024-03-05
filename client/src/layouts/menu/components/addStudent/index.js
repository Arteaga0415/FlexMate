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

import MDButton from "components/MDButton";
import { Stack, TextField } from "@mui/material";
import { userServices } from "appServices";

function AddStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  //For membership
  const [membershipType, setMembershipType] = useState(null);
  const [selectedMembership, setSelectedMembership] = useState('Full');
  const [openMembership, setOpenMembership] = useState(false);
  //For membership
  const [type, setType] = useState(null);
  const [selectedType, setSelectedType] = useState('Adult');
  const [openType, setOpenType] = useState(false);
  //For belt
  const [belt, setBelt] = useState(null);
  const [selectedBelt, setSelectedBelt] = useState('Belt');
  const [openBelt, setOpenBelt] = useState(false);
  //For Gender
  const [gender, setGender] = useState(null);
  const [selectedGender, setSelectedGender] = useState('Gender');
  const [openGender, setOpenGender] = useState(false);
  //For the text field changes
  const handleTextChange = (setter) => (event) => {
    setter(event.target.value);
  };
  //For membership
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
  //For Type
  const handleClickType = (event) => {
    setOpenType(true);
    setType(event.currentTarget);
  };
  const handleCloseType = (type) => () => {
    if (type) {
      setSelectedType(type);
    }

    setOpenType(false);
    setType(null);
  };
  //For Belt
  const handleClickBelt = (event) => {
    setOpenBelt(true);
    setBelt(event.currentTarget);
  };
  const handleCloseBelt = (belt) => () => {
    if (belt) {
      setSelectedBelt(belt);
    }
    setOpenBelt(false);
    setBelt(null);
  };
  //For Gender
  const handleClickGender = (event) => {
    setOpenGender(true);
    setGender(event.currentTarget);
  };
  const handleCloseGender = (gender) => () => {
    if (gender) {
      setSelectedGender(gender);
    }
    setOpenGender(false);
    setGender(null);
  };

  const handleSubmit = () => {
    if (!name || !email || !age) {
      alert("Please fill all the required fields.");
      return;
    }
    const postData = {
      name: name,
      email: email,
      membership: selectedMembership,
      type: selectedType,
      status: "true",
      date: new Date(),
      gender: selectedGender,
      age: age,
      belt: selectedBelt,
      classesInBelt: 1, 
    };
    console.log("Data to post: ", postData);
    userServices.postUser(postData)
    .then((result) => {
        if (result) {
          setName('');
          setEmail('');
          setAge('');
          setSelectedMembership('Full'); 
          setSelectedType('Adult');
          setSelectedBelt('Belt');
          setSelectedGender('Gender');
          // alert("User posted successfully");
        }
      })
      .catch((error) => {
        console.error("Failed to post User", error);
      });
  };

  return (
    <Card sx={{height: '100%' }}>
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
      <MDBox sx={{ marginLeft: '25px', overflowY: 'auto', maxWidth: '280px' }}>
        <Stack spacing={3} direction='column' >
          <MDBox mt={10} >
            <TextField label='Name' value={name} variant='outlined' onChange={handleTextChange(setName)} />
          </MDBox>
          <TextField label='Email' value={email} variant='outlined' onChange={handleTextChange(setEmail)} />
          <MDBox color="text" >
            <MDButton onClick={handleClickMembership} variant="outlined" color="info" size="large" >
              {selectedMembership}
            </MDButton>
            <Menu
              anchorEl={membershipType}
              open={openMembership}
              onClose={handleCloseMembership('')}
            >
              <MenuItem onClick={handleCloseMembership('Full')}>Full</MenuItem>
              <MenuItem onClick={handleCloseMembership('Annual')}>Annual</MenuItem>
              <MenuItem onClick={handleCloseMembership('Regular')}>Regular</MenuItem>
            </Menu>
          </MDBox>
          <MDBox color="text" >
            <MDButton onClick={handleClickType} variant="outlined" color="info" size="large" >
              {selectedType}
            </MDButton>
            <Menu
              anchorEl={type}
              open={openType}
              onClose={handleCloseType('')}
            >
              <MenuItem onClick={handleCloseType('Adult')}>Adult</MenuItem>
              <MenuItem onClick={handleCloseType('Kids')}>Kids</MenuItem>
            </Menu>
          </MDBox>
          <MDBox color="text" >
            <MDButton onClick={handleClickBelt} variant="outlined" color="info" size="large" >
              {selectedBelt}
            </MDButton>
            <Menu
              anchorEl={belt}
              open={openBelt}
              onClose={handleCloseBelt('')}
            >
              <MenuItem onClick={handleCloseBelt('White')}>White</MenuItem>
              <MenuItem onClick={handleCloseBelt('Blue')}>Blue</MenuItem>
              <MenuItem onClick={handleCloseBelt('Purple')}>Purple</MenuItem>
              <MenuItem onClick={handleCloseBelt('Brown')}>Brown</MenuItem>
              <MenuItem onClick={handleCloseBelt('Black')}>Black</MenuItem>
            </Menu>
          </MDBox>
          <MDBox color="text" >
            <MDButton onClick={handleClickGender} variant="outlined" color="info" size="large" >
              {selectedGender}
            </MDButton>
            <Menu
              anchorEl={gender}
              open={openGender}
              onClose={handleCloseGender('')}
            >
              <MenuItem onClick={handleCloseGender('Male')}>Male</MenuItem>
              <MenuItem onClick={handleCloseGender('Female')}>Female</MenuItem>
              <MenuItem onClick={handleCloseGender('Female')}>Not Specify</MenuItem>
            </Menu>
          </MDBox>
          <TextField label='Age' value={age} variant='outlined' sx={{ maxWidth: '100px '}} onChange={handleTextChange(setAge)} />
        </Stack>
        <MDBox mt={2} mb={3}>
          <MDButton variant="contained" color="info" size="large" onClick={handleSubmit} >
            Submit
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default AddStudent;
