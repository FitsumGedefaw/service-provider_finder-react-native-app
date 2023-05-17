import { async } from "@firebase/util";
import axios from "axios";

// put firebase api key here
const API_KEY = "Firebase api key................";
const FirebasDatabaseLink = "firebase database link ..............."

export const createUserAuth = async (email, password) => {
  const response = await axios.post(
    FirebasDatabaseLink + ":signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );

  return response.data;
};

export const logUserInAuth = async (email, password) => {
  const response = await axios.post(
    FirebasDatabaseLink + ":signInWithPassword?key=" +
    API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );

  return response.data;
};
