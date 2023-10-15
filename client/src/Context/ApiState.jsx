import ApiContext from "./ApiContext";

const ApiProvider = ({ children }) => {
  const url = "http://localhost:5000";
  const token = localStorage.getItem("token");
  return <ApiContext.Provider value={{url,token}}>{children}</ApiContext.Provider>;
};

export default ApiProvider;