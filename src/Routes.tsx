import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

const Pokemon = React.lazy(() => import("./pages/Pokemon"));
function HomeRoutes() {
  const navigate = useNavigate();

  // Function to fetch events data
  //   const fetchEventsData = async () => {
  //     try {
  //       // Define the URL with query parameters
  //       const apiUrl =
  //         "https://cloud.ev-center.com/zakatseeb/be_light/api/getEvents.php";

  //       // Define the query parameters as an object
  //       const params = {
  //         username: "admin",
  //         password: "aDMin1234",
  //       };

  //       // Make a GET request using Axios
  //       const response = await axios.get(apiUrl, { params });

  //       // Handle the API response here
  //       console.log("API Response:", response.data);
  //       setEventsData(response.data);
  //     } catch (error) {
  //       // Handle any errors here
  //       console.error("Error:", error);
  //     }
  //   };

  // Initial data fetch when the component mounts
  //   useEffect(() => {
  //     fetchEventsData();
  //   }, []);

  return (
    <Routes>
      <Route path={`pokemones/:pokemonID`} element={<Pokemon />} />
    </Routes>
  );
}

export default HomeRoutes;
