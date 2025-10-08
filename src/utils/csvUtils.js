// CSV utility for exporting logs

function escapeCsvField(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const str = String(value);
  const needsQuoting = /[",\n\r]/.test(str) || str.startsWith(' ') || str.endsWith(' ');
  const escaped = str.replace(/"/g, '""');
  return needsQuoting ? `"${escaped}"` : escaped;
}

export function logsToCsv(logs) {
  const headers = ['id', 'date', 'timestamp', 'userId', 'text'];
  const headerLine = headers.join(',');
  const lines = logs.map((log) => {
    const row = [
      escapeCsvField(log.id),
      escapeCsvField(log.date ?? ''),
      escapeCsvField(log.timestamp ?? ''),
      escapeCsvField(log.userId ?? ''),
      escapeCsvField(log.text ?? ''),
    ];
    return row.join(',');
  });
  return [headerLine, ...lines].join('\r\n');
}

export function downloadCsv(csvString, filename = 'logs.csv') {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportLogsAsCsv(logs, filename = 'logs.csv') {
  const csv = logsToCsv(logs);
  downloadCsv(csv, filename);
}


