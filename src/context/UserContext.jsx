import { createContext, useState, useContext } from "react";

// Contexto para manejar el usuario seleccionado globalmente
const UserContext = createContext();

export function UserProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personalizado para acceder al contexto
export function useUser() {
  return useContext(UserContext);
}
