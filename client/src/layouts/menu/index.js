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
I grabed created the two imported layouts below
*/
import MenuLayout from "./layout";
import MenuNavbar from "../navbars/default.js";

import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data from creative tim
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import DataTable from "examples/Tables/DataTable";
import { useState, useEffect } from "react";
import { userServices } from "appServices";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { Leaderboard } from "@mui/icons-material";
import { transformWeeklyResponse } from "./data/weeklyData";

function Menu() {
  const [weekChart, setWeekChart] = useState({
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{ label: "Sessions", data: [0, 0, 0, 0, 0, 0, 0] }], 
  });

  useEffect(() => {
    const fetchAndTransformData = async () => {
      try {
        const weeklyAssistance = await userServices.fetchWeeklyAssistance(); 
        const transformedData = transformWeeklyResponse(weeklyAssistance);
        // console.log('Weekly data before transformed: ', weeklyAssistance);
        // console.log('Weekly data transformed: ', transformedData);
        setWeekChart(transformedData);
      } catch (error) {
        console.error("Failed to fetch and transform weekly assistance data:", error);
      }
    };

    fetchAndTransformData();
  }, []);


  const { sales, tasks } = reportsLineChartData;
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
                value={30}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                color="info"
                icon="leaderboard"
                title="Students"
                value={30}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                color="dark"
                icon="store"
                title="Students"
                value={30}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="Weekly Sessions"
                description="Sessions attended per day"
                date="Last 7 days"
                chart={weekChart} 
              />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </MenuLayout>
  );
}
export default Menu;
