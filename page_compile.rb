HEADER = "misc/header.html"
FOOTER = "misc/footer.html"
COMPOUND_DIR = "compound"
DATA_DIR = "data"
IMAGE_DIR =  "image"
def create_page(n)
  header_file = File.new(HEADER, 'r')
  footer_file = File.new(FOOTER, 'r')
  following = n + 1
  past = n - 1

  comp_name = "kod#{n}_2.jpg"
  image_name = "#{n}.gif"
  data_file = File.new(File.join("#{DATA_DIR}", "#{n}.html"), 'r')
  following_link = %Q[<a href="#{following}.html"><button>#{following}</button></a>\n]
  past_link = %Q[<a href="#{past}.html"><button>#{past}</button></a>\n]

  output_file = File.new("final/#{n}.html", 'w')

  input = ""
  result = ""
  
  result += input while input = header_file.gets
  result += %Q[<div id="kanji">#{n}</div>]
  result += %Q[<img id="image" src="../#{IMAGE_DIR}/#{image_name}" height="100" width="100"/>\n]
  result += %Q[<img id="compound" src="../#{COMPOUND_DIR}/#{comp_name}"/>\n]
  result += input while input = data_file.gets
  result += past_link
  result += following_link
  result += input while input = footer_file.gets

  output_file.syswrite result

  puts "#{n} completed"
end
(1..800).each do |t|
  begin
  create_page(t)
  rescue
    puts "#{$!} oops "
  end
end
