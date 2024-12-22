import json
from googletrans import Translator, LANGUAGES
import time

# Initialize Google Translate API translator
translator = Translator()

def translate_text(text, target_language='en'):
    """
    Translate text to the target language using Google Translate API.
    
    Args:
    - text: The text to be translated.
    - target_language: The language to translate to (default is English).

    Returns:
    - Translated text or the original text if there is an error.
    """
    if not text or text.strip() == "":
        print(f"Skipping empty or invalid text: '{text}'")
        return text  # Return the original text if it's empty or None

    try:
        print(f"Translating: {text}")
        translated = translator.translate(text, dest=target_language)
        print(f"Translated Text: {translated.text}")
        return translated.text
    except Exception as e:
        print(f"Error translating text '{text}': {e}")
        return text  # Return the original text if there's an error

def translate_json(input_json_path, output_json_path, target_language='en'):
    """
    Translate specific fields in a JSON file and save the result to a new JSON file.
    
    Args:
    - input_json_path: The path to the input JSON file.
    - output_json_path: The path to save the translated JSON file.
    - target_language: The language to translate to (default is English).
    """
    try:
        with open(input_json_path, 'r', encoding='utf-8') as infile:
            data = json.load(infile)
        
        # Loop through each item in the JSON data
        for item in data:
            # Translate the specified fields if they exist
            if 'Quote' in item and item['Quote']:
                item['Quote'] = translate_text(item['Quote'], target_language)
            if 'Likes' in item and item['Likes']:
                item['Likes'] = translate_text(item['Likes'], target_language)
            if 'Nationality' in item and item['Nationality']:
                item['Nationality'] = translate_text(item['Nationality'], target_language)
        
        # Save the translated data to a new file
        with open(output_json_path, 'w', encoding='utf-8') as outfile:
            json.dump(data, outfile, indent=4, ensure_ascii=False)

        print(f"Translated JSON saved to {output_json_path}")
    
    except FileNotFoundError:
        print(f"File not found: {input_json_path}")
    except Exception as e:
        print(f"Error processing JSON: {e}")

input_json_path = 'biodata.json'  
output_json_path = 'biodatatrans.json' 

translate_json(input_json_path, output_json_path)
