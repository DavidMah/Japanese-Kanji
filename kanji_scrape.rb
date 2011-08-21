require 'mechanize'
WEBSITE = 'http://japanese.about.com/library/'
def system_call(input)
	while not s = system(input)
		sleep(0.5)
	end
	s
end

def process_kanji(k, image_dir, data_dir, compound_dir)
	definition_agent = Mechanize.new
	def_url = WEBSITE + k.attr('href')

	children = k.children.to_a
	#img node is at varying indexes do to crap like <br />
	while child = children.pop
		if child.node_name == 'img'
			image_url = child.attr('src')
			break
		end
	end
	image_url = WEBSITE + image_url if image_url.partition(/http/)[2] == ""
	kanji_num = image_url.partition(/[0-9]+/)[1]

	table = definition_agent.get(def_url).search('table')[0].to_s
	compounds = WEBSITE + definition_agent.get(def_url).search('#articlebody').search('p').search('img')[2].attr('src')

	system_call('wget -q '+ image_url +' && mv '+ kanji_num +'.gif '+ image_dir)
	system_call('echo "'+ table +'" >> '+ data_dir +'/'+ kanji_num +'.html')
	system_call('wget -q '+ compounds +' && mv kod'+ kanji_num +'_2.jpg '+ compound_dir)

	puts 'completed '+ kanji_num.to_s
end


level = ARGV[0] || 'grade2'
data_dir = 'data' + level.to_s
image_dir = 'image' + level.to_s
compound_dir = 'compound' + level.to_s
system('mkdir '+ data_dir +' && mkdir '+ image_dir +' && mkdir '+ compound_dir)
agent = Mechanize.new
agent.get(WEBSITE + 'blkod' + level.to_s + '.htm')
kanji = agent.page.search('#articlebody').search('a').to_a
kanji.slice!(0, 2)
kanji.slice!(-3, 3)

for i in 80...kanji.size
  k = kanji[i]
	process_kanji(k, image_dir, data_dir, compound_dir)
end
