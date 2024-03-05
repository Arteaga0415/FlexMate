/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-alert, indent, prettier/prettier */


export const userServices = {
  //fetch all Active members (users)
  fetchActiveUsers: async () => {
    try {
      const response = await fetch("http://localhost:3333/active");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const users = await response.json();
      return users;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert(`Failed to fetch users: ${error.message}`);
    }
  },
  //fetch all inactive members (users)
  fetchInactiveUsers: async () => {
    try {
      const response = await fetch("http://localhost:3333/inactive");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const users = await response.json();
      return users;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert(`Failed to fetch users: ${error.message}`);
    }
  },
  //fetch all members (users)
  fetchUsers: async () => {
    try {
      const response = await fetch("http://localhost:3333/user");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const users = await response.json();
      return users;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert(`Failed to fetch users: ${error.message}`);
    }
  },
  //post a new member
  postUser: async (userData) => {
    try {
      const response = await fetch("http://localhost:3333/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to post new user");
      }
      const newUser = await response.json();
      return newUser;
    } catch (error) {
      console.error("There was a problem with the post operation:", error);
    }
  },
  //delete a member
  deleteUser: async (id) => {
    try {
      const response = await fetch(`http://localhost:3333/user/${id}`, {
        method: "DELETE",
      });
      // console.log("response ok: ", response.ok);
      // if (!response.ok) {
      //   throw new Error("Failed to delete user assistance");
      // }
      // const result = await response.json();
      // return result;
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  },
  fetchWeeklyAssistance: async () => {
    try {
      const response = await fetch("http://localhost:3333/weekly");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const weeklyAssistance = await response.json();
      return weeklyAssistance;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert(`Failed to fetch weekly assistance: ${error.message}`);
    }
  },
  deleteWeeklyAssistance: async () => {
    try {
      const response = await fetch("http://localhost:3333/weekly", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete weekly assistance");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  },
  postWeeklyAssistance: async (data) => {
    try {
      const response = await fetch("http://localhost:3333/updateweekly", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to post weekly assistance");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("There was a problem with the post operation:", error);
    }
  },
  ////////////////////////////////////
  fetchHistorical: async () => {
    try {
      const response = await fetch("http://localhost:3333/historical");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const historicalAssistance = await response.json();
      return historicalAssistance;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert(`Failed to fetch historical assistance: ${error.message}`);
    }
  },
  fetchOneHistorical: async (userId) => {
    try {
      const response = await fetch(`http://localhost:3333/historical/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userHistorical = await response.json();
      console.log('response: ', userHistorical);
      return userHistorical;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert(`Failed to fetch historical assistance: ${error.message}`);
    }
  },
  postHistoricalAssistance: async (data) => {
    try {
      const response = await fetch("http://localhost:3333/historical", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to post Historical assistance");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("There was a problem with the post operation:", error);
    }
  },
};
