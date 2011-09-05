# Japanese Kanji Self Study Thing
>>Content is scraped off of japanese.about.com<<

This is just a compilation of many early grade kanji that can be viewed locally in a web browser
A bunch of hacks thrown together for my kanji practice

open /final/__anything__ and you can see a kanji, its pronounciations, meanings, and some common compounds. Change the url to see a different kanji. The ids of each kanji are arbitrary

You don't really want to run the scraper or compiler because it's all already built into final.
It also probably won't work because of some directory problems.

## kanji_scrape.rb
scrapes content from japanese.about.com
takes a grade level(by url from japanese.about.com) and scrapes all of those into a directory
Retrieved is the kanji image, compounds html, and pronounciation html

## scrape_complete.rb
runs kanji_scrape for all known working grade levels

## page_compile.rb
takes content from scrape_complete and hackily grossly puts together a page to read in final/_id_.html

## random/random.html
Enter ids of kanji into the textarea separated by spaces, and the images of those kanji will be shuffled and output below. Useful for self quizzing


# misc
Helper files for the pages; css and template html for the pages

# toughies
Are just kanji that my brain had trouble remembering, so i stored the ids in a text file to easily input into random.html
