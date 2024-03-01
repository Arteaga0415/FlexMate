export const userServices = {
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
    }
  },
  //post a new member
  //delete a member
  fetchWeekly: async () => {},
  fetchHistorical: async () => {},
};
