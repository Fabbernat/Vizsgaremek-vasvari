export function exportJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportCSV<T extends object>(data: T[], filename: string) {
  if (!data.length) return;

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(row =>
    Object.values(row)
      .map(value => `"${String(value).replace(/"/g, '""')}"`)
      .join(",")
  );

  const csv = [headers, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}