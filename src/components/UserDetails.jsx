import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Users.css"; // Importa el archivo de estilos

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (!user) return <p className="text-center">Usuario no encontrado</p>;

  return (
    <div className="containerUserDetails">
      <div className="userDetailsContent">
        <h2>Detalles del Usuario</h2>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>
        <p><strong>Compañía:</strong> {user.company.name}</p>
        <p><strong>Dirección:</strong> {user.address.street}, {user.address.city}</p>
        <div className="buttonContainer">
          <button
            className="backButton"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
