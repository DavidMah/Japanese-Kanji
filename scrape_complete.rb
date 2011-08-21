for i in ((1..6).to_a.map{|n| 'grade'+ n.to_s})# + ['jh'])
	puts i
	system('ruby kanji_scrape.rb '+ i)
end
