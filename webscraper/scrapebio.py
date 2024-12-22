import requests
import bs4
import json


def get_biodata(url, name):
    """
    Extracts biodata (quote, DoB, Likes, MBTI, and Nationality) from a given URL.
    Returns a dictionary with the biodata fields.
    """
    URL = url
    
    try:
        req = requests.get(URL)
        req.encoding = 'utf-8'  # Ensure correct encoding
        soup = bs4.BeautifulSoup(req.text, 'html.parser')
  
        # Extract the first 4 <span> tags with class 'utSubText'
        span_tags = soup.select('span.utSubText')
        print(span_tags)

        # Check if there are enough span tags
        span1 = span_tags[0].get_text(strip=True) if len(span_tags) > 0 else None
        span2 = span_tags[1].get_text(strip=True) if len(span_tags) > 1 else None
        span3 = span_tags[2].get_text(strip=True) if len(span_tags) > 2 else None
        span4 = span_tags[3].get_text(strip=True) if len(span_tags) > 3 else None


        # Return the biodata as a dictionary
        return {
            "Name": name,
            "Quote": span4,
            "DoB": span1,
            "Likes": "",
            "MBTI": span3,
            "Nationality": span2
        }
        
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch {URL}: {e}")
        return None

def fetch_biodata_from_names(urls):
    """
    Given a list of URLs, fetches the biodata for each and returns a list of biodata dictionaries.
    """
    data2 = []
    for name, url in urls:
        biodata = get_biodata(url, name)
        if biodata:
            data2.append(biodata)
    return data2

def load_names_from_contestant_json():
    try:
        with open('contestant.json', 'r', encoding='utf-8') as infile:
            data = json.load(infile)
            # Load name and bio URL from each contestant
            urls = [(contestant['Name'], contestant['Bio URL']) for contestant in data]
            return urls
    except FileNotFoundError:
        print("contestant.json not found. Please make sure the file exists.")
        return []

# Load contestant URLs and names
urls = load_names_from_contestant_json()

# Fetch biodata for all contestants
if urls:
    biodata = fetch_biodata_from_names(urls)

    # Save the biodata to a JSON file
    with open('biodata.json', 'w', encoding='utf-8') as outfile: 
        json.dump(biodata, outfile, indent=4, ensure_ascii=False)
else:
    print("No names found in contestant.json.")
