import React from "react";
import ExportCsvButton from "./ExportCsvButton";
import ExportPdfButton from "./ExportPdfButton";

export default function Header(props) {
  // props.logs will be used if provided
  return (
    <header className="app-header">
      <h1 className="text-4xl font-bold text-purple-600">plumdejour</h1>
      <p className="text-lg text-gray-600">Your Daily Log Tracker</p>

      <div className="header-actions">
        <ExportCsvButton logs={props.logs} />
        <ExportPdfButton logs={props.logs} />
      </div>
    </header>
  );
}
