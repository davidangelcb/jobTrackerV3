import React from "react";
import Menu from "../components/Menu";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <div className="header-top d-flex justify-content-between align-items-center py-3 px-3">
        <h1 className="text-primary fs-3 fw-100 my-0">PINCH</h1>
        <div className="tracking">
          <span className="text-secondary me-2 text-blue">Tracking #124578</span>
          <button className="btn btn-share btn-sm fw-600">
            <i className="bi bi-share fs-6"></i> Share
          </button>
        </div>
      </div>

      <div className="header-status d-flex justify-content-between align-items-center text-secondary bg-secondary small py-2 px-3 fw-100">
        <div className="lh-normal turn-clean">
          <span>Turn Clean</span>
        </div>

        <div className="d-flex align-items-center">
          <span className="status text-blue me-2 rounded-4 in-progress">
            • In Progress
          </span>
          <span className="support">
            <i className="bi bi-question-circle-fill fs-3 me-0"></i>
          </span>
        </div>
      </div>

      <Menu />

    </header>
  );
}
