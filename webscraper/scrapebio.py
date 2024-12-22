import requests
import bs4
import json

def get_image_url(s):
    """
    Converts a string representing a name into a format suitable for fetching images.
    """
    s = s.split('(')[0]
    s = s.replace("-", "")         
    s = s.replace(" ", "")      
    return s

def get_biodata(name):
    """
    Extracts biodata (quote, DoB, Likes, MBTI, and Nationality) from a given name.
    Returns a dictionary with the biodata fields.
    """
    URL = 'https://project7.kr/' + get_image_url(name).lower()
    
    try:
        req = requests.get(URL)
        req.encoding = 'utf-8'  # Ensure correct encoding
        soup = bs4.BeautifulSoup(req.text, 'html.parser')

        # Extract the first <p> tag (Quote)
        quote_tag = soup.find('p')
        quote = quote_tag.get_text(strip=True) if quote_tag else None

        # Extract the first 4 <dd> tags (Date of Birth, Likes, MBTI, Nationality)
        dd_tags = soup.find_all('dd')
        dd1, dd2, dd3, dd4 = (dd_tags[i].get_text(strip=True) if i < len(dd_tags) else None for i in range(4))

        # Return the biodata as a dictionary
        return {
            "Name": name,
            "Quote": quote,
            "DoB": dd1,
            "Likes": dd2,
            "MBTI": dd3,
            "Nationality": dd4
        }
        
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch {URL}: {e}")
        return None

def fetch_biodata_from_names(names):
    """
    Given a list of names, fetches the biodata for each and returns a list of biodata dictionaries.
    """
    data2 = []
    for name in names:
        biodata = get_biodata(name)
        if biodata:
            data2.append(biodata)
    return data2

def load_names_from_contestant_json():
    try:
        with open('contestant.json', 'r', encoding='utf-8') as infile:
            data = json.load(infile)
            names = [contestant['Name'] for contestant in data]
            return names
    except FileNotFoundError:
        print("contestant.json not found. Please make sure the file exists.")
        return []

names = load_names_from_contestant_json()

if names:
    biodata = fetch_biodata_from_names(names)

    with open('biodata.json', 'w', encoding='utf-8') as outfile: 
        json.dump(biodata, outfile, indent=4, ensure_ascii=False)
else:
    print("No names found in contestant.json.")
