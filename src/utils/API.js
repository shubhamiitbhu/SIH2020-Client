import axios from "axios";

export default axios.create({
  baseURL: "https://sih-2020-26518.firebaseapp.com/",
  responseType: "json",
});