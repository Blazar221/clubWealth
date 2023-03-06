import axios from "axios";

const starwars = {
  getPeople: async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/people");
      debugger
      return response.data.results;
    } catch (error) {
      return error;
    }
  },
  getPlanets: async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/planets");
      debugger
      return response.data.results;
    } catch (error) {
      return error;
    }
  },
  getStarships: async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/starships");
      return response.data.results;
    } catch (error) {
      return error;
    }
  }
};

export default starwars;
