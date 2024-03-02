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
  //delete a member
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
  fetchHistorical: async () => {},
};
