import os
import re

# Directory path to your project
directory_path = '.'  # Replace with your directory path

function_names = []

# Function to check for duplicate functions in a file
def check_duplicate_functions(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        file_content = file.read()
        # Regex to match function declarations
        regex = r'function (\w+)'
        matches = re.findall(regex, file_content)
        
        for match in matches:
            if match in function_names:
                print(f'Duplicate function found: {match} in file {file_path}')
            else:
                function_names.append(match)

# Function to iterate over all files in the directory and subdirectories
def find_duplicates_in_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.js'):  # Check only JavaScript files
                full_path = os.path.join(root, file)
                check_duplicate_functions(full_path)

# Run the function to scan the project directory
find_duplicates_in_directory(directory_path)
