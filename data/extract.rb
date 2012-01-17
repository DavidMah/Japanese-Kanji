require 'json'
require 'yaml'

input = File.new('kanji.yml', 'r')
data = YAML.parse(input).transform.to_json
output = File.new('kanji.json', 'w')
output.syswrite data
