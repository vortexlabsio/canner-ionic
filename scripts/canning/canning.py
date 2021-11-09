import json

import requests
from bs4 import BeautifulSoup
from datetime import datetime


def build_url(inject):
    url = ""
    base = "https://www.mrswages.com/recipes/"
    params = "?category=192&cuisine=&sort=date_desc&content-search="

    if inject == 1:
        url = f"{base}{params}"
    else:
        url = f"{base}page/{inject}/{params}"
    return url


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
    return res.content


def scrape(content):
    soup = BeautifulSoup(content, "html.parser")
    recipes = soup.find_all("div", class_="cooked-result-box")
    return recipes


def store_recipe(recipes, page): 
    current = datetime.now().isoformat()
    recipe_file = open(f"recipe_{current}/recipe_page_{page}.json", "a")
    json.dump(recipes, recipe_file) 
    recipe_file.close()


def build_recipe(raw_content, page):
    recipes = []
    for content in raw_content:
        print(content)
        title = content.find("h2").find("a").text.strip()
        recipe_url = content.find("h2").find("a")["href"]
        img_url = content.find("img")["src"]

        recipe = {
            "title": title,
            "recipe_url": recipe_url,
            "img_url": img_url,
        }
        recipes.append(recipe)
    store_recipe(recipes, page)


def get_page_recipes(page):
    url = build_url(page)
    content = get_content(url)
    recipes = scrape(content)
    return recipes


def main(pages):
    for page in range(pages):
        recipes = get_page_recipes(page)
        build_recipe(recipes, page)


if __name__ == "__main__":
    rounds = 10
    main(rounds)
