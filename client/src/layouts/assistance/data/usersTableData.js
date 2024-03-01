/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Import React and useState, useEffect hooks
import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { userServices } from "../../../appServices";

export default function usersTableData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await userServices.fetchUsers();
      if (fetchedUsers) {
        setUsers(fetchedUsers);
      }
    };
    fetchUsers();
  }, []);

  const UserComponent = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
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

  const columns = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Email", accessor: "email", align: "left" },
    { Header: "Membership", accessor: "membership", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Action", accessor: "action", align: "center" },
  ];

  const rows = users.map((user) => ({
    name: <UserComponent name={user.name} email={user.email} />,
    email: user.email, 
    membership: <MembershipComponent membership={user.membership} status={user.status} />,
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={user.status ? "Active" : "Inactive"}
          color={user.status ? "success" : "secondary"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    action: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        Edit
      </MDTypography>
    ),
  }));

  return { columns, rows };
}
