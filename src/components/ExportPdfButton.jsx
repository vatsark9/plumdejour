import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportPdfButton({ logs }) {
  const getLogs = () => {
    if (Array.isArray(logs)) return logs;
    try {
      const ls = localStorage.getItem("logs");
      if (ls) return JSON.parse(ls);
    } catch (e) {}
    return window.logs || [];
  };

  const flatten = (v) => {
    if (v == null) return "";
    if (Array.isArray(v)) return v.join(";");
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  };

  const handleExport = () => {
    const data = getLogs();
    if (!data || data.length === 0) {
      return alert("No logs to export");
    }

    const headersSet = new Set();
    data.forEach((row) => {
      Object.keys(row || {}).forEach((k) => headersSet.add(k));
    });
    const headers = Array.from(headersSet);

    const rows = data.map((row) => headers.map((h) => flatten(row ? row[h] : "")));

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("plumdejour Logs", 14, 15);

    // use the function form from jspdf-autotable
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 22,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [99, 102, 241] },
    });

    const date = new Date().toISOString().slice(0, 10);
    doc.save(`plumdejour-logs-${date}.pdf`);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      title="Export logs as PDF"
      className="ml-3 px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
      aria-label="Export logs as PDF"
    >
      Export as PDF
    </button>
  );
}