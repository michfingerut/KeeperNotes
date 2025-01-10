import { createContext, useContext, useState, useEffect } from "react";

const GroupInfoContext = createContext();
const AuthContext = createContext();

export const GroupInfoProvider = ({ children }) => {
  const [groupId, setGroupId] = useState(localStorage.getItem("groupId"));
  const [groupName, setGroupName] = useState(localStorage.getItem("groupName"));

  useEffect(() => {
    localStorage.setItem("groupId", groupId);
  }, [groupId]);

  return (
    <GroupInfoContext.Provider
      value={{
        groupId,
        setGroupId,
        groupName,
        setGroupName,
      }}
    >
      {children}
    </GroupInfoContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [uuid, setUUID] = useState(localStorage.getItem("uuid"));

  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem("isLogged")) || false,
  );

  useEffect(() => {
    localStorage.setItem("uuid", uuid);
  }, [uuid]);

  useEffect(() => {
    localStorage.setItem("isLogged", isLogged);
  }, [isLogged]);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, uuid, setUUID }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGroupInfo = () => useContext(GroupInfoContext);
export const useAuth = () => useContext(AuthContext);
