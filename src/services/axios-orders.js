import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-cfbcf.firebaseio.com/",
});

export default instance;
