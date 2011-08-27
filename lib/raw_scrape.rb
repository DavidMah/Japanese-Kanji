# raw_scrape.rb
require 'nokogiri'
require 'open-uri'
require 'json'

TYPES = ['on', 'kun', 'english']
ROOT = ".."
OUTPUT = File.join(ROOT, "data/kanji_json.txt")

# Scrapes table from ROOT/final/n.html
# Returns hash of index, on, kun, english mappings
def scrape_kanji(index)
  begin
    input = File.open("#{ROOT}/final/#{index}.html")
  rescue
    puts $!
    return %Q[{"failure" : "true"}]
  end
  page = Nokogiri::HTML(input)
  areas = []
  # Extracts the desired entries.. and a few more
  page.css('td:nth-child(2) font').each do |content|
    areas << (content.content.gsub(/( |\n|\r)+/, ' '))
  end

  # Some minor formatting and remove extra entries
  areas.map!{|i| i.split(",")}
  areas = areas.slice!(1..3)

  # Insert TYPES into arrays, then transform into hash
  3.times                 {|t| areas[t].insert(0, TYPES[t])}
  areas.map!              {|a| { a.delete_at(0) => a } }
  areas.push({ :index => index})
  areas = areas.inject({}){|a, hash| a.merge(hash)}

  areas
end

kanji_json = []
(1..799).each do |index|
  kanji_json << scrape_kanji(index)
end

output = File.open(OUTPUT, 'w')
output.syswrite(kanji_json.to_json)
