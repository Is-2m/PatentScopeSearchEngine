import os
from bs4 import BeautifulSoup
import csv

# Path to the local HTML file
html_file = "patents.html"

# Check if the file exists
if not os.path.exists(html_file):
    raise FileNotFoundError(f"{html_file} not found. Make sure the file exists in the specified path.")

# Read the HTML content from the local file
with open(html_file, "r", encoding="utf-8") as file:
    html_content = file.read()

# Parse the HTML with BeautifulSoup
soup = BeautifulSoup(html_content, "html.parser")

# Find the table by its class
table = soup.find("table", {"class": "table table-striped documentation-parameters"})

if not table:
    raise ValueError("Table with class 'table table-striped documentation-parameters' not found in the HTML document.")

# Extract table headers
headers = [header.text.strip() for header in table.find_all("th")]

# Extract table rows
rows = table.find_all("tr")[1:]  # Skip the header row
data = []
for row in rows:
    columns = [col.text.strip() for col in row.find_all("td")]
    data.append(columns)

# Write to a CSV file
csv_file = "parameters_table.csv"
with open(csv_file, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(headers)  # Write the headers
    writer.writerows(data)  # Write the data rows

print(f"Table data has been saved to {csv_file}")
