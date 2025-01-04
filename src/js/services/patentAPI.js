class PatentAPI {
    static API_BASE_URL = 'https://api.patentsview.org/patents/query';
    static RESULTS_PER_PAGE = 25;

    static async searchPatents(query) {
        const response = await fetch(this.API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        });

        if (!response.ok) {
            throw new Error(`Search failed: ${response.statusText}`);
        }

        return await response.json();
    }
}