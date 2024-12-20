import requests
import bs4
import re
from itertools import product
import json
import time


def table_to_2d(table_tag):
    rowspans = [] 
    rows = table_tag.find_all('tr')

    colcount = 0
    for r, row in enumerate(rows):
        cells = row.find_all(['td', 'th'], recursive=False)
       
        colcount = max(
            colcount,
            sum(int(c.get('colspan', 1)) or 1 for c in cells[:-1]) + len(cells[-1:]) + len(rowspans))
        rowspans += [int(c.get('rowspan', 1)) or len(rows) - r for c in cells]
        rowspans = [s - 1 for s in rowspans if s > 1]

    table = [[None] * colcount for row in rows]

    rowspans = {}  
    for row, row_elem in enumerate(rows):
        span_offset = 0  
        for col, cell in enumerate(row_elem.find_all(['td', 'th'], recursive=False)):
            col += span_offset
            while rowspans.get(col, 0):
                span_offset += 1
                col += 1

            rowspan = rowspans[col] = int(cell.get('rowspan', 1)) or len(rows) - row
            colspan = int(cell.get('colspan', 1)) or colcount - col
            span_offset += colspan - 1
            value = cell.get_text()
            for drow, dcol in product(range(rowspan), range(colspan)):
                try:
                    table[row + drow][col + dcol] = value
                    rowspans[col + dcol] = rowspan
                except IndexError:
                    pass
        rowspans = {c: s - 1 for c, s in rowspans.items() if s > 1}
    return table

def remove_references(text):
    """
    Reformats text to be as desired for purpose.

    Args:
        text: The input string.

    Returns:
        A string that has been reformated as described below
    """
    text = re.sub(r"\[.*?\]", "", text)  # Remove text within square brackets
    text = text.replace("\n", "")         # Remove newline characters
    text = text.replace("Entertainment", "Ent.")         # Remove newline characters
    text = re.sub(r"(?<=[^ ])\(", " (", text)  # Add space before "(" if not preceded by a space
    return text.strip()  # Remove leading/trailing whitespace

def string_to_int(s):
    """
    Converts a string to an integer if possible, otherwise returns -1 (i.e. elimination).

    Args:
        s: The input string which may be a number passed as a string.

    Returns:
        The integer value of the string if it represents a valid integer, 
        otherwise -1.
    """
    try:
        return int(s)
    except ValueError:
        return -1
  
def take_current_age(s):
    """
    Converts a string with numbers representing age to an integer if possible, 
    otherwise then it will take the older of the age

    Args:
        s: The input string.

    Returns:
        The integer value of the string if it represents a valid integer, 
        otherwise the integer value of the substring after a hyphen.
    """
    try:
        return int(s)
    except ValueError:
        return s[3:]
  
def get_image_url(s):
    """
    Converts a string with representing a name

    Args:
        s: The input string.

    Returns:
        The integer value of the string if it represents a valid integer, 
        otherwise the integer value of the substring after a hyphen.
    """
    s = s.split('(')[0]
    s = s.replace("-", "")         
    s = s.replace(" ", "")      
    return s   



URL = 'https://en.wikipedia.org/wiki/Project_7'
req = requests.get(URL)
soup = bs4.BeautifulSoup(req.text, 'html.parser')
table = soup.find_all('table')[2]
rows = table.find_all('tr')
table_data = table_to_2d(table)
data=[]
data2=[]

for row in table_data[3:]:
    if len(row) >= 1:
        company = remove_references(row[0])
        name = remove_references(row[1])
        age = string_to_int(take_current_age(remove_references(row[2])))
        eval = remove_references(row[3]) 
        ep2 = string_to_int(remove_references(row[4]))
        ep3 = string_to_int(remove_references(row[5]))
        ep5 = string_to_int(remove_references(row[6]))
        ep6 = string_to_int(remove_references(row[7]))
        ep8 = string_to_int(remove_references(row[8]))
        final = string_to_int(remove_references(row[9]))
        img = get_image_url(name) + ".jpg"

        data.append({
                "Company": company,
                "Name": name,
                "Age": age,
                "Master's \nEvaluation": eval,
                "Ep. 2": ep2,
                "Ep. 3": ep3,
                "Ep. 5": ep5,
                "Ep. 6": ep6,
                "Ep. 8": ep8,
                "Final": final,
                "Image": img
            })
        URL = 'https://project7.kr/' + get_image_url(name).lower()
        try:
            req = requests.get(URL)
            req.encoding = 'utf-8'  # Ensure correct encoding
            soup = bs4.BeautifulSoup(req.text, 'html.parser')

            # Extract the first <p> tag (Quote)
            quote_tag = soup.find('p')
            quote = quote_tag.get_text(strip=True) if quote_tag else None

            # Extract the first 4 <dd> tags
            dd_tags = soup.find_all('dd')
            dd1, dd2, dd3, dd4 = (dd_tags[i].get_text(strip=True) if i < len(dd_tags) else None for i in range(4))

            # Append data to data2 (e.g., biodata)
            data2.append({
                "Name": name,
                "Quote": quote,
                "DoB": dd1,
                "Likes": dd2,
                "MBTI": dd3,
                "Nationality": dd4
            })
        except requests.exceptions.RequestException as e:
            print(f"Failed to fetch {URL}: {e}")
            continue

    else:
        print(f"Row has insufficient cells: {row}")

with open('contestant.json', 'w', encoding='utf-8') as outfile: 
    json.dump(data, outfile, indent=4, ensure_ascii=False) 

with open('biodata.json', 'w', encoding='utf-8') as outfile:
    json.dump(data2, outfile, indent=4, ensure_ascii=False)