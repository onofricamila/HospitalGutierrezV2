import axios from "axios";

const path = "https://api-referencias.proyecto2017.linti.unlp.edu.ar/";

const instance = axios.create({
  baseURL: path,
});

export default instance;

export {path};
