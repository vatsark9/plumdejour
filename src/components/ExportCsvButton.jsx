import React from "react";

export default function ExportCsvButton({ logs }) {
  const tryLocalStorageKeys = ["logs", "plumdejour_logs", "plumLogs", "entries", "plumdejour"];

  const getLogs = () => {
    if (Array.isArray(logs)) {
      console.debug("ExportCsvButton: using logs prop (length)", logs.length);
      return logs;
    }

    for (const key of tryLocalStorageKeys) {
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            console.debug("ExportCsvButton: found logs in localStorage key:", key);
            return parsed;
          }
        }
      } catch (e) {
        console.debug("ExportCsvButton: parse error for key", key, e);
      }
    }

    // final fallback
    if (Array.isArray(window.logs)) {
      console.debug("ExportCsvButton: using window.logs");
      return window.logs;
    }

    console.debug("ExportCsvButton: no logs found in props/localStorage/window");
    return [];
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
      return alert("No logs to export (check console for where logs are stored)");
    }

    const headersSet = new Set();
    data.forEach((row) => {
      Object.keys(row || {}).forEach((k) => headersSet.add(k));
    });
    const headers = Array.from(headersSet);

    const csvRows = [headers.join(",")];
    data.forEach((row) => {
      const cells = headers.map((h) => {
        const raw = flatten(row ? row[h] : "");
        const escaped = raw.replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(cells.join(","));
    });

    const csvContent = csvRows.join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const date = new Date().toISOString().slice(0, 10);
    link.download = `plumdejour-logs-${date}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      title="Export logs as CSV"
      className="ml-3 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
      aria-label="Export logs as CSV"
    >
      Export CSV
    </button>
  );
}