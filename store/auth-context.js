import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  isEmployer: false,
  set_Is_Employer: (b) => { },
  set_Is_SP: (b) => { },
  isSP: false,
  authEmail: "",
  setAuthEmail: (email) => { },
  authenticate: (token) => { },
  logout: () => { },
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const [is_employer, setIsEmployer] = useState(false);

  const [email, setEmail] = useState();

  const [is_SP, setIsSP] = useState(false);

  const setEmployer = (b) => {
    setIsEmployer(b);
  };

  const setSP = (b) => {
    setIsSP(b);
  };

  const set_email = (email) => {
    setEmail(email);
  };

  const authenticate = (token) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
  };

  const value = {
    isSP: is_SP,
    set_Is_SP: setSP,
    isEmployer: is_employer,
    set_Is_Employer: setEmployer,
    token: authToken,
    authEmail: email,
    setAuthEmail: set_email,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
