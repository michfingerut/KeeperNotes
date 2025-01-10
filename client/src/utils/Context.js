import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();
const AuthContext = createContext();
const MenuItemsContext = createContext();

export const GroupInfoProvider = ({ children }) => {
  const [groupId, setGroupId] = useState(localStorage.getItem("groupId"));
  const [groupName, setGroupName] = useState(localStorage.getItem("groupName"));

  useEffect(() => {
    localStorage.setItem("groupId", groupId);
  }, [groupId]);

  return (
    <Context.Provider
      value={{
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

export const MenuItemsProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);

  // const [groupId, setGroupId] = useState(localStorage.getItem("groupId"));
  // const [groupName, setGroupName] = useState(localStorage.getItem("groupName"));

  // useEffect(() => {
  //   localStorage.setItem("groupId", groupId);
  // }, [groupId]);

  return (
    <MenuItemsContext.Provider value={{ menuItems, setMenuItems }}>
      {children}
    </MenuItemsContext.Provider>
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

export const useGroupInfo = () => useContext(Context);
export const useAuth = () => useContext(AuthContext);
export const useItems = () => {
  useContext(MenuItemsContext);
};
