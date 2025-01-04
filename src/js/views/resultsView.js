class ResultsView {
    static updateStats(totalCount) {
        document.getElementById('stats').innerHTML = 
            `Found ${totalCount.toLocaleString()} patents`;
    }

    static displayResults(data) {
        const resultsDiv = document.getElementById('results');

        if (!data.patents || data.patents.length === 0) {
            resultsDiv.innerHTML = '<p>No patents found.</p>';
            return;
        }

        const resultsHtml = data.patents
            .map(patent => this.createPatentHTML(patent))
            .join('');

        resultsDiv.innerHTML = resultsHtml;
    }

    static createPatentHTML(patent) {
        return `
            <div class="patent-item">
                <div class="patent-title">${patent.patent_title || 'Untitled'}</div>
                <div class="patent-details">
                    <p><strong>Patent Number:</strong> ${patent.patent_number}</p>
                    <p><strong>Date:</strong> ${DateFormatter.formatDate(patent.patent_date)}</p>
                    <p><strong>Type:</strong> ${patent.patent_type} (${patent.patent_kind})</p>
                    ${this.getInventorHtml(patent)}
                    ${this.getAssigneeHtml(patent)}
                    ${this.getCPCHtml(patent)}
                    ${patent.patent_abstract 
                        ? `<p><strong>Abstract:</strong> ${patent.patent_abstract}</p>` 
                        : ''}
                </div>
            </div>
        `;
    }

    static getInventorHtml(patent) {
        if (!patent.inventor_first_name && !patent.inventor_last_name) return '';

        const names = [];
        if (Array.isArray(patent.inventor_first_name)) {
            for (let i = 0; i < patent.inventor_first_name.length; i++) {
                const fullName = `${patent.inventor_first_name[i] || ''} ${patent.inventor_last_name[i] || ''}`.trim();
                if (fullName) names.push(fullName);
            }
        } else {
            const fullName = `${patent.inventor_first_name || ''} ${patent.inventor_last_name || ''}`.trim();
            if (fullName) names.push(fullName);
        }

        return names.length 
            ? `<p><strong>Inventor${names.length > 1 ? 's' : ''}:</strong> ${names.join(', ')}</p>`
            : '';
    }

    static getAssigneeHtml(patent) {
        if (!patent.assignee_organization) return '';

        const assigneeType = this.getAssigneeTypeText(patent.assignee_type);
        return `<p><strong>Assignee:</strong> ${patent.assignee_organization}${assigneeType ? ` (${assigneeType})` : ''}</p>`;
    }

    static getCPCHtml(patent) {
        if (!patent.cpc_section_id || !patent.cpc_group_id) return '';

        const cpcCodes = Array.isArray(patent.cpc_section_id)
            ? patent.cpc_section_id.map((section, i) => `${section}${patent.cpc_group_id[i]}`)
            : [`${patent.cpc_section_id}${patent.cpc_group_id}`];

        return `<p><strong>CPC:</strong> ${cpcCodes.join(', ')}</p>`;
    }

    static getAssigneeTypeText(type) {
        const types = {
            2: 'US Company',
            3: 'Foreign Company',
            4: 'US Individual',
            5: 'Foreign Individual',
            6: 'US Government',
            7: 'Foreign Government',
            8: 'County Government',
            9: 'State Government'
        };
        return types[type] || '';
    }
}