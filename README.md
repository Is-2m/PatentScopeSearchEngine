# Patent Search Engine Project Summary

## Project Overview:
The project is a A vanilla JavaScript application for searching and exploring patent data using the PatentsView legacy API. Its goal is to allow users to search for patents based on various criteria such as inventor name, assignee organization, patent dates, keywords, and more. The application fetches data from the API and displays it in a user-friendly format with pagination and search functionality.

---

## Team Members

The following members collaborated on the Patent Search Engine Project:

- **ALJIRAF Ibtissam**  
- **ELKHIOUAKH Salma**  
- **ISAM Soufiane**  
- **MORDY Hatim**  
- **OUANGOUL Maryam**  

## Project Structure
```
./
  /src
    /assets
      /styles
        main.css
        search.css
        results.css
        utils.css
    /js
      /services
        patentAPI.js
        exportService.js
      /utils
        dateFormatter.js
        queryBuilder.js
        domUtils.js
      /views
        searchView.js
        resultsView.js
        paginationView.js
      app.js
  index.html
  README.md
```
## Setup

1. Clone the repository
2. Open `index.html` in a web browser

## Features

- Advanced patent search functionality
- Filtering by various patent attributes
- Export results to CSV
- Responsive design
- Pagination support

## Development

The application is built using vanilla JavaScript with a modular architecture:

- Services: Handle API communication and data processing
- Utils: Provide helper functions for common tasks
- Views: Manage UI components and user interactions
- App: Coordinates the application flow

## API Overview
### Base URL
- **GET**: `https://api.patentsview.org/patents/query?q=<query>&f=<fields>`
- **POST**: `https://api.patentsview.org/patents/query`

### Request Structure
1. **GET Requests**:
   - Include query parameters directly in the URL.
   - Example:
     ```text
     https://api.patentsview.org/patents/query?q={"_gte":{"patent_date":"2007-01-04"}}&f=["patent_number","patent_date"]
     ```

2. **POST Requests**:
   - Include query as a JSON body.
   - Example:
     ```json
     {
       "q": { "_gte": { "patent_date": "2007-01-04" } },
       "f": ["patent_number", "patent_date"]
     }
     ```

### Operators
- `_gte`: Greater than or equal to.
- `_lte`: Less than or equal to.
- `_and`: Combine multiple conditions.
- `_or`: At least one condition must match.
- `_text_any`: Search for keywords in text fields (only valid for certain fields).
- `_neq`: Not equal to.

---

### Examples
1. **Find patents with numbers and titles after 2006 by inventor "Jobs" and assignee in the US**:
* GET:
```
   https://api.patentsview.org/patents/query?q={"_and":[{"_gte":{"patent_date":"2006-01-01"}},{"inventor_last_name":"Jobs"},{"assignee_lastknown_country":"US"}]}&f=["patent_number","patent_title"]
```

* POST:
```
   {
       "q": {
           "_and": [
               {"_gte": {"patent_date": "2006-01-01"}},
               {"inventor_last_name": "Jobs"},
               {"assignee_lastknown_country": "US"}
           ]
       },
       "f": ["patent_number", "patent_title"]
   }
```

2. **Find patent number, processing time, and kind for patents with "international" in the abstract (foreign assignee)**:


* GET:
```
    https://api.patentsview.org/patents/query?q={"_and":[{"_gte":{"patent_date":"2001-01-01"}},{"_text_any":{"patent_abstract":"international"}},{"_neq":{"assignee_lastknown_country":"US"}}]}&f=["patent_number","patent_processing_time","patent_kind"]
```

* POST:
```
	{
        "q": {
            "_and": [
                {"_gte": {"patent_date": "2001-01-01"}},
                {"_text_any": {"patent_abstract": "international"}},
                {"_neq": {"assignee_lastknown_country": "US"}}
            ]
        },
        "f": ["patent_number", "patent_processing_time", "patent_kind"]
    }
    ```
    
3. **Find location details of inventors for a given patent**:
    
    ```text
    GET:
    https://api.patentsview.org/patents/query?q={"patent_number":"8395459"}&f=["patent_number","inventor_id","inventor_location_id","inventor_city","inventor_state","inventor_country"]
    
    POST:
    {
        "q": { "patent_number": "8395459" },
        "f": ["patent_number", "inventor_id", "inventor_location_id", "inventor_city", "inventor_state", "inventor_country"]
    }
```

---

## CSV Files

### 1. `patents_table.csv`

**Description**: Contains a list of patent fields available in the API (field names and descriptions).

- **Purpose**: Helps identify what data is retrievable from the API and the specific field names to use in queries.
- **Example Content**:

| Field Name      | Description                     |
| --------------- | ------------------------------- |
| `patent_number` | Unique identifier for a patent. |
| `patent_title`  | Title of the patent.            |
| `patent_date`   | Date the patent was granted.    |
| `assignee_name` | Name of the assignee.           |




### 2. `parameters_table.csv`

**Description**: Contains a list of parameters, their valid operators, and how they are used in queries.

- **Purpose**: Guides the construction of queries by specifying valid fields and operators for each parameter.
- **Example Content**:

|Parameter|Valid Operators|Description|
|---|---|---|
|`patent_date`|`_gte`, `_lte`|Date range filtering for patents.|
|`inventor_last_name`|Exact match|Filter patents by inventor's last name.|
|`assignee_organization`|`_text_any`, Exact match|Search by assignee organization name.|


---

## Key Points

1. **Search Flexibility**: The API supports powerful filtering, including text search, date range, and conditional logic.
2. **Data Sources**: CSV files provide metadata for building and refining queries.
3. **Limitations**: Some fields, like `inventor_last_name`, do not support `_text_any`. Use exact match instead.

This project combines structured querying with dynamic user input to build a robust search interface for patents. Let me know if you need additional details!
