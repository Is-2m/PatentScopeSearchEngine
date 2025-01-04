class QueryBuilder {
    static build(page = 1) {
        const conditions = [];
        
        // Get form values
        const formValues = this.getFormValues();

        // Add conditions based on form values
        this.addKeywordCondition(conditions, formValues.keyword);
        this.addDateConditions(conditions, formValues.dateFrom, formValues.dateTo);
        this.addInventorConditions(conditions, formValues.inventorFirstName, formValues.inventorLastName);
        this.addAssigneeConditions(conditions, formValues.assigneeName, formValues.assigneeType);
        this.addPatentTypeCondition(conditions, formValues.patentType);
        this.addCPCConditions(conditions, formValues.cpcSection, formValues.cpcClass);
        this.addCountryCondition(conditions, formValues.countryCode);

        return {
            q: conditions.length > 1 ? { _and: conditions } : conditions[0] || {},
            f: [
                'patent_number',
                'patent_title',
                'patent_date',
                'patent_abstract',
                'inventor_first_name',
                'inventor_last_name',
                'assignee_organization',
                'assignee_type',
                'patent_type',
                'patent_kind',
                'cpc_section_id',
                'cpc_group_id'
            ],
            o: {
                page: page,
                per_page: PatentAPI.RESULTS_PER_PAGE
            },
            s: [{ [formValues.sortField]: formValues.sortOrder }]
        };
    }

    static getFormValues() {
        return {
            keyword: document.getElementById('keywordSearch').value.trim(),
            dateFrom: document.getElementById('dateFrom').value,
            dateTo: document.getElementById('dateTo').value,
            inventorFirstName: document.getElementById('inventorFirstName').value.trim(),
            inventorLastName: document.getElementById('inventorLastName').value.trim(),
            assigneeName: document.getElementById('assigneeName').value.trim(),
            assigneeType: document.getElementById('assigneeType').value,
            patentType: document.getElementById('patentType').value,
            cpcSection: document.getElementById('cpcSection').value.toUpperCase(),
            cpcClass: document.getElementById('cpcClass').value,
            countryCode: document.getElementById('countryCode').value,
            sortField: document.getElementById('sortField').value,
            sortOrder: document.getElementById('sortOrder').value
        };
    }

    static addKeywordCondition(conditions, keyword) {
        if (keyword) {
            conditions.push({
                _or: [
                    { _text_any: { patent_title: keyword } },
                    { _text_any: { patent_abstract: keyword } }
                ]
            });
        }
    }

    static addDateConditions(conditions, dateFrom, dateTo) {
        if (dateFrom) {
            conditions.push({
                _gte: { patent_date: dateFrom }
            });
        }
        if (dateTo) {
            conditions.push({
                _lte: { patent_date: dateTo }
            });
        }
    }

    static addInventorConditions(conditions, firstName, lastName) {
        if (firstName || lastName) {
            const inventorConditions = [];
            if (firstName) {
                inventorConditions.push({ inventor_first_name: firstName });
            }
            if (lastName) {
                inventorConditions.push({ inventor_last_name: lastName });
            }
            if (inventorConditions.length > 1) {
                conditions.push({ _and: inventorConditions });
            } else {
                conditions.push(inventorConditions[0]);
            }
        }
    }

    static addAssigneeConditions(conditions, name, type) {
        if (name) {
            conditions.push({ assignee_organization: name });
        }
        if (type) {
            conditions.push({
                _or: type.split(',').map(t => ({ assignee_type: t }))
            });
        }
    }

    static addPatentTypeCondition(conditions, type) {
        if (type) {
            conditions.push({ patent_type: type });
        }
    }

    static addCPCConditions(conditions, section, classCode) {
        if (section) {
            conditions.push({ cpc_section_id: section });
            if (classCode) {
                conditions.push({ cpc_class: classCode });
            }
        }
    }

    static addCountryCondition(conditions, country) {
        if (country) {
            conditions.push({ assignee_country: country });
        }
    }
}