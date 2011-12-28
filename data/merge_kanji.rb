require 'json'
data  = JSON.parse(File.read('kanji_json.txt'))
input = File.read('kanji.txt').split("\n")
input.each_index do |t|
  data[t]['kanji'] = input[t]
end

File.write('kanji_json.txt', data.to_json)
