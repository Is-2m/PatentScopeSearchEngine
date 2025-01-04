// resultsView.js
function updateStats(totalCount) {
  document.getElementById("stats").innerHTML =
    totalCount !== undefined
      ? `Found ${totalCount.toLocaleString()} patents`
      : "No results found";
}

function displayResults(data) {
  const resultsDiv = document.getElementById("results");

  if (!data.patents || data.patents.length === 0) {
    resultsDiv.innerHTML = "<p>No patents found.</p>";
    return;
  }

  const resultsHtml = data.patents
    .map((patent) => createPatentHTML(patent))
    .join("");

  resultsDiv.innerHTML = resultsHtml;
}

function createPatentHTML(patent) {
  return `
            <div class="patent-item">
                <div class="patent-title">${
                  patent.patent_title || "Untitled"
                }</div>
                <div class="patent-details">
                    <div class="main-details">
                        <p><strong>Patent Number:</strong> ${
                          patent.patent_number
                        }</p>
                        <p><strong>Date:</strong> ${formatDate(
                          patent.patent_date
                        )}</p>
                        <p><strong>Type:</strong> ${patent.patent_type} (${
    patent.patent_kind
  })</p>
                    </div>
                    
                    <div class="expandable-section">
                        <div class="expandable-header" onclick="ResultsView.toggleSection(this)">
                            <span class="expand-icon">▼</span> Inventors
                        </div>
                        <div class="expandable-content">
                            ${this.getInventorsTable(patent.inventors)}
                        </div>
                    </div>

                    <div class="expandable-section">
                        <div class="expandable-header" onclick="ResultsView.toggleSection(this)">
                            <span class="expand-icon">▼</span> Assignees
                        </div>
                        <div class="expandable-content">
                            ${this.getAssigneesTable(patent.assignees)}
                        </div>
                    </div>

                    <div class="expandable-section">
                        <div class="expandable-header" onclick="ResultsView.toggleSection(this)">
                            <span class="expand-icon">▼</span> CPC Classifications
                        </div>
                        <div class="expandable-content">
                            ${this.getCPCTable(patent.cpcs)}
                        </div>
                    </div>

                    ${
                      patent.patent_abstract
                        ? `<div class="expandable-section">
                            <div class="expandable-header" onclick="ResultsView.toggleSection(this)">
                                <span class="expand-icon">▼</span> Abstract
                            </div>
                            <div class="expandable-content">
                                <p>${patent.patent_abstract}</p>
                            </div>
                           </div>`
                        : ""
                    }
                </div>
            </div>
        `;
}

function getInventorsTable(inventors) {
  if (!inventors || inventors.length === 0) return "<p>No inventors listed</p>";

  return `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    ${inventors
                      .map(
                        (inv) => `
                        <tr>
                            <td>${inv.inventor_first_name}</td>
                            <td>${inv.inventor_last_name}</td>
                            <td>${inv.inventor_key_id}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
        `;
}

function getAssigneesTable(assignees) {
  if (!assignees || assignees.length === 0) return "<p>No assignees listed</p>";

  return `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Organization</th>
                        <th>Type</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    ${assignees
                      .map(
                        (ass) => `
                        <tr>
                            <td>${ass.assignee_organization}</td>
                            <td>${this.getAssigneeTypeText(
                              ass.assignee_type
                            )}</td>
                            <td>${ass.assignee_key_id}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
        `;
}

function getCPCTable(cpcs) {
  if (!cpcs || cpcs.length === 0) return "<p>No CPC classifications listed</p>";

  return `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Section</th>
                        <th>Group</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    ${cpcs
                      .map(
                        (cpc) => `
                        <tr>
                            <td>${cpc.cpc_section_id}</td>
                            <td>${cpc.cpc_group_id}</td>
                            <td>${this.getCPCDescription(
                              cpc.cpc_section_id
                            )}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
        `;
}

function getCPCDescription(section) {
  const descriptions = {
    A: "Human Necessities",
    B: "Performing Operations; Transporting",
    C: "Chemistry; Metallurgy",
    D: "Textiles; Paper",
    E: "Fixed Constructions",
    F: "Mechanical Engineering; Lighting; Heating; Weapons; Blasting",
    G: "Physics",
    H: "Electricity",
    Y: "General Tagging of New Technological Developments",
  };
  return descriptions[section] || "Unknown Section";
}

function toggleSection(header) {
  const content = header.nextElementSibling;
  const icon = header.querySelector(".expand-icon");

  content.style.maxHeight = content.style.maxHeight
    ? null
    : content.scrollHeight + "px";
  icon.textContent = content.style.maxHeight ? "▼" : "▲";
}

function getAssigneeTypeText(type) {
  const types = {
    2: "US Company",
    3: "Foreign Company",
    4: "US Individual",
    5: "Foreign Individual",
    6: "US Government",
    7: "Foreign Government",
    8: "County Government",
    9: "State Government",
  };
  return types[type] || "";
}
