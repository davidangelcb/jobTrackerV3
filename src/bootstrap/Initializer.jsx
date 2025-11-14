import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalStore } from "../store/useGlobalStore";
import Loader from "../assets/images/loading.svg";
import "./Initializer.css";

export default function Initializer({ children }) {
  const setUuid = useGlobalStore((s) => s.setUuid);
  const setToken = useGlobalStore((s) => s.setToken);
  const setDbName = useGlobalStore((s) => s.setDbName);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uuid = window.location.pathname.replace("/", "");
    console.log('uuid', uuid);
    if (!uuid) {
      console.error("ERROR: No se envió UUID en la url inicial.");
      return;
    }

    setUuid(uuid);

    const API_URL = import.meta.env.VITE_API_URL;
    console.log('API_URL', API_URL);

    axios
      .get(`${API_URL}`, {
        params: { uuid: uuid }
      })
      .then((res) => {
        setToken(res.data);
        setDbName(uuid);
      })
      .catch((err) => {
        console.error("Error inicial:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <img src={Loader} alt="Cargando..." />
      </div>
    );
  }

  return children;
}
