/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-alert, indent, prettier/prettier */
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
/**
 Vic - here 
Sebastian Arteaga
I grabed this from the dashboard but basically modified it all.
*/
import MenuLayout from "./layout";
import MenuNavbar from "../navbars/default.js";

import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data from creative tim
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
import AddStudent from "./components/addStudent";
import OrdersOverview from "./components/OrdersOverview";

// import DataTable from "examples/Tables/DataTable";
import { useState, useEffect } from "react";
import { userServices } from "appServices";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
// import { Leaderboard } from "@mui/icons-material";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { transformWeeklyResponse } from "./data/weeklyData";
import { transformHistoricalResponse } from "./data/monthlyData";

function Menu() {
  const [weekChart, setWeekChart] = useState({
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{ label: "Sessions", data: [0, 0, 0, 0, 0, 0, 0] }], 
  });
  const [monthlyChart, setMonthlyChart] = useState({
    labels: ["Jan", "Feb", "May", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{ label: "Sessions", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }], 
  });
  const [userAmount, setUserAmount] = useState(null);
  const [usersDue, setUsersDue] = useState(null);
  const [usersThisWeek, setUsersThisWeek] = useState(null);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchAndTransformData = async () => {
      try {
        const weeklyAssistance = await userServices.fetchWeeklyAssistance();
        const historicalAssistance = await userServices.fetchHistorical();
        const users = await userServices.fetchUsers();
        const transformDataWeekly = transformWeeklyResponse(weeklyAssistance);
        const transformDataHistorical = transformHistoricalResponse(historicalAssistance);
        //console.log('Monthly data transformed: ', transformDataHistorical);
        // console.log('Users length: ', users.length);
        setWeekChart(transformDataWeekly);
        setMonthlyChart(transformDataHistorical);
        setUserAmount(users.length);
        setUsersThisWeek(sumWeeklyAssistances(transformDataWeekly));
        const dueUsers = users.filter(user => user.status === false);
        setUsersDue(dueUsers.length);

        const studentList = users.map(user => ({
          name: user.name,
          _id: user._id
        }));
        setUserList(studentList)

      } catch (error) {
        console.error("Failed to fetch and transform Atendance data:", error);
      }
    };
    fetchAndTransformData();
  }, []);

  const sumWeeklyAssistances = ({datasets}) => {
    console.log('Reducer: ', datasets);
    let sum = 0;
    datasets.data.forEach((el) => {
      sum = sum + el;
    })
    return sum;
  }

  return (
    <MenuLayout>
      <MenuNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                color="dark"
                icon=<SportsKabaddiIcon></SportsKabaddiIcon>
                title="Students"
                value={userAmount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                color="info"
                icon=<ProductionQuantityLimitsIcon></ProductionQuantityLimitsIcon>
                title="Students Due Membership"
                value={usersDue}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                color="dark"
                icon="store"
                title="Students This Week"
                value={usersThisWeek}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="Classes"
                description="Sessions attended per day"
                date="Last 7 days"
                chart={weekChart} 
              />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="Students"
                description="Students per month"
                date="Last year"
                chart={monthlyChart} 
              />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox sx={{ overflowY: 'auto' }}>
          <Grid container spacing={3} >
            <Grid item xs={12} md={6} lg={4}>
              <AddStudent />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <OrdersOverview userList={userList} weekChart={weekChart} />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </MenuLayout>
  );
}
export default Menu;
