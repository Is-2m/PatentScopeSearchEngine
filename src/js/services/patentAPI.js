// patentAPI.js
const API_BASE_URL = "https://api.patentsview.org/patents/query";
const RESULTS_PER_PAGE = 25;

async function searchPatentsApi(query) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      patents: data.patents || [],
      total_patent_count: data.total_patent_count || 0,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
