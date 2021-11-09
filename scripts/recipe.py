import json
import os

import requests
from bs4 import BeautifulSoup


def get_content(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:94.0) Gecko/20100101 Firefox/94.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "X-Requested-With": "XMLHttpRequest",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
    }

    res = requests.get(url=url, headers=headers)
    soup = BeautifulSoup(res.content, "html.parser")
    return soup


def scrape(content):
    url = content.get("recipe_url")
    img = content.get("img_url")
    recipe = {}
    recipe_details = get_content(url)
    ingredients = scrape_ingredients(recipe_details)
    directions = scrape_directions(recipe_details)
    recipe["img_url"] = img
    recipe["yields"] = ingredients
    recipe["ingredients"] = ingredients
    recipe["directions"] = directions 
    return recipe


def scrape_yield(content):
    recipe_yields = content.find_all("span", class_="recipeYield").text
    return recipe_yields


def scrape_ingredients(content):
    recipes = content.find_all("p", class_="product-entry ingredient")
    return recipes


def scrape_directions(content):
    recipes = content.find_all("p", class_="product-entry directions")
    return recipes


def store_content(recipe, file_name): 
    recipe_file = open(file_name, "a")
    json.dump(recipe, recipe_file) 
    recipe_file.close()


def get_recipe_files(directory):
    file_list = os.listir(directory)
    return file_list


def main(directory, file_name):
    files = get_recipe_files(directory)
    for file in files:
        content = get_content(file)
        recipe = scrape(content)
        store_content(recipe, file_name)


if __name__ == "__main__":
    directory = "recipes"
    file_name = "recipes.json"
    main()
