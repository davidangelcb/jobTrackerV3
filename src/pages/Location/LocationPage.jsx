import React from "react";
// import JobInfoCard from "../components/JobInfoCard";

export default function LocationPage() {
  return (
    <div className="p-3 pt-4">
      <h1 className="fw-700 mb-2">Job Info</h1>
      <p className="bg-light text-secondary small p-2 rounded">
        Payment will be delayed if you fail to Share Location.
      </p>

      <hr className="border-secondary opacity-25" />

      <div className="p-1 mt-3">
        <div className="mb-2">
          <strong className="fw-600">Riverhood Apartaments</strong>
          <p className="mb-0 text-secondary small">
            4902 N Mac Dill Ave, Tampa, FL. 33612
            <br /> Unit 202
          </p>
        </div>

        <hr className="border-secondary opacity-25" />

        <div className="d-flex justify-content-between align-items-center small mb-3">
            <span className="badge bg-success-subtle text-success rounded-0">
              <i className="bi bi-geo-alt-fill me-1"></i> Location Shared
            </span>
            <span className="text-muted">02:41 PM-06/04/2025 - Florida</span>
        </div>

        <hr className="border-secondary opacity-25" />

        <p className="mb-1 fw-semibold">Cleaning Type</p>
        <p className="text-secondary">Turnover</p>

        <p className="mb-1 fw-semibold">Scheduled</p>
        <p className="text-secondary">Thursday, May 8th, 2025</p>

        <p className="mb-1 fw-semibold">Special Instructions</p>
        <p className="text-secondary small">
          To review the specifications, please check the job in your account.
        </p>

        <hr className="border-secondary opacity-25" />

        
      </div>

      { /*
        <JobInfoCard />
      */}
    </div>
  );
}
