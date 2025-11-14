import React from "react";
import Header from "./components/Header";
import { useJobStore } from "./store/useJobStore";
import LocationPage from "./pages/Location/LocationPage";
import EvidencePage from "./pages/Evidence/EvidencePage";
import SummaryPage from "./pages/Summary/SummaryPage";
import OrientationOverlay from './components/OrientationOverlay';

export default function App() {
  const activeMenu = useJobStore((state) => state.activeMenu);

  const renderPage = () => {
    switch (activeMenu) {
      case "evidence":
        return <EvidencePage />;
      case "summary":
        return <SummaryPage />;
      default:
        return <LocationPage />;
    }
  };

  return (
    <>
      <Header />

      {/* Contenido con scroll */}
      <main style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {renderPage()}

        {/* Overlay de orientación */}
        <OrientationOverlay />
      </main>
    </>
  );
}
