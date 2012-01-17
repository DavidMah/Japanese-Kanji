require 'json'
require 'yaml'
data  = YAML.parse(File.read('kanji.yml')).transform
input = File.read('kanji.txt').split("\n")
input.each_index do |t|
  data[t]['kanji'] = input[t]
end

File.write('kanji.yml', data.to_yaml)
