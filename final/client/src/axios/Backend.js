import axios from "axios";

const path = "http://localhost:3001/api/";

const instance = axios.create({
  baseURL: path,
});

export default instance;

export {path};
