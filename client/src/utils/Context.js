import { createContext, useContext, useState, useEffect } from "react";

export const Context = createContext();
const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const [uuid, setUUID] = useState(localStorage.getItem("uuid"));
  const [groupId, setGroupId] = useState(localStorage.getItem("groupId"));
  const [groupName, setGroupName] = useState(localStorage.getItem("groupName"));

  useEffect(() => {
    localStorage.setItem("uuid", uuid);
  }, [uuid]);

  useEffect(() => {
    localStorage.setItem("groupId", groupId);
  }, [groupId]);

  return (
    <Context.Provider
      value={{
        uuid,
        setUUID,
        groupId,
        setGroupId,
        groupName,
        setGroupName,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem("isLogged")) || false,
  );

  useEffect(() => {
    localStorage.setItem("isLogged", isLogged);
  }, [isLogged]);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useContextItems = () => useContext(Context);
export const useAuth = () => useContext(AuthContext);
