// exportService.js
function convertToCSV(data) {
  const headers = [
    "Patent Number",
    "Title",
    "Date",
    "Type",
    "Kind",
    "Inventors",
    "Assignee",
    "CPC Codes",
    "Abstract",
  ];

  const rows = data.map((patent) => [
    patent.patent_number,
    patent.patent_title,
    patent.patent_date,
    patent.patent_type,
    patent.patent_kind,
    getInventorsText(patent),
    patent.assignee_organization || "",
    getCPCText(patent),
    (patent.patent_abstract || "").replace(/"/g, '""'),
  ]);

  return [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");
}

function getInventorsText(patent) {
  if (!patent.inventor_first_name && !patent.inventor_last_name) return "";

  const names = [];
  if (Array.isArray(patent.inventor_first_name)) {
    for (let i = 0; i < patent.inventor_first_name.length; i++) {
      const fullName = `${patent.inventor_first_name[i] || ""} ${
        patent.inventor_last_name[i] || ""
      }`.trim();
      if (fullName) names.push(fullName);
    }
  } else {
    const fullName = `${patent.inventor_first_name || ""} ${
      patent.inventor_last_name || ""
    }`.trim();
    if (fullName) names.push(fullName);
  }

  return names.join("; ");
}

function getCPCText(patent) {
  if (!patent.cpc_section_id || !patent.cpc_group_id) return "";

  const cpcCodes = Array.isArray(patent.cpc_section_id)
    ? patent.cpc_section_id.map(
        (section, i) => `${section}${patent.cpc_group_id[i]}`
      )
    : [`${patent.cpc_section_id}${patent.cpc_group_id}`];

  return cpcCodes.join("; ");
}

function downloadCSV(data, filename) {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}