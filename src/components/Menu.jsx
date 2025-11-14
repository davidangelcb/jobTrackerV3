import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useGlobalStore } from "../store/useGlobalStore";

export default function Menu() {
  const { activeMenu, setActiveMenu } = useGlobalStore();

  const menus = [
    { id: "location", label: "Location", icon: "bi-cursor-fill" },
    { id: "evidence", label: "Evidence", icon: "bi-camera-fill" },
    { id: "summary", label: "Summary", icon: "bi-clipboard-check-fill" },
  ];

  return (
    <div className="main-menu d-flex justify-content-around bg-primary py-0">
      {menus.map((menu) => {
        const isActive = activeMenu === menu.id;
        return (
          <button
            key={menu.id}
            className={`btn d-flex flex-column align-items-center border-0 ${
              isActive ? "text-white" : "text-light opacity-50"
            }`}
            onClick={() => setActiveMenu(menu.id)}
          >
            <i className={`bi ${menu.icon} mb-1 fs-3`}></i>
            <span className="small fw-semibold">{menu.label}</span>
          </button>
        );
      })}
    </div>
  );
}
