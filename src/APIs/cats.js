import axios from "axios";

//documentation @https://docs.thecatapi.com/
//feel free to add more functions!

const API_KEY = "live_fmLMK6dNfmtDKNo84TSNwly2lmhtZhbLBIoVOtxB9QyNGzJKxiVQgBhRwvC0ohTY"

const cats = {
  get100Cats: async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?limit=100&api_key=" + API_KEY
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  getRandomCat: async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      return response;
    } catch (error) {
      return error;
    }
  }
};

export default cats;
