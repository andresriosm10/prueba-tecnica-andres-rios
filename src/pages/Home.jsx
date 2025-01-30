import { useState } from "react";
import UserList from "../components/UserList";
import "../styles/Users.css"

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="containerHome">
      <h1 >Gestión de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <UserList search={search} />
    </div>
  );
}
