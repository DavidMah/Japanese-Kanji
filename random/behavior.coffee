## random/behavior.coffee
#
# Handles behavior of the random page
#
# random.html can spawn a grid of kanji images from what indexes are input into the text box.
# Mouseovers to the grid of kanji produce a small window with definition information.

MODALHEIGHT = 100
MODALWIDTH  = 300

$(document).ready( () ->
  window.element_data = []
  $('#create'  )[0].onclick = extractInput
  $('#shuffle' )[0].onclick = shuffleGrid
  $('#autofill')[0].onclick = autofillInput
  $(document).mousemove(reactToMouseMove)
  prepareKanjiData()
)

## Visual stuff, like populating the list or generating popup modals

# Takes all of the values in the text box and spawns the grid of kanji
extractInput = () ->
  imagesElement = $('#images' )[0]
  input         = $('#numbers')[0].value

  input = input.replace(/\n/g, '  ')
  input = input.split(///\x20+///) # All Whitespace

  imagesElement.innerHTML = ""
  window.element_data     = []
  for id in input
    createImage(id)
    window.element_data[id] = [id]

shuffleGrid = () ->
  fillGrid(shuffle())

shuffle = () ->
  elements = []
  for num in window.element_Data
    elements.push num if num
  scramble(elements)
  elements

fillGrid = (elements) ->
  imagesElement.innerHTML = ""
  for id in elements
    createImage(id)

# Given a kanji index, appends the image for that Kanji to the grid if the image exists
createImage = (index) ->
  # Make sure file exists
  image_url = "../image/#{index}.gif"
  $.ajax({
    url     : image_url,
    type    : 'HEAD',
    success : () -> buildImage(index, image_url)
  })

# Constructs the HTML element for a kanji of given element
buildImage = (index, image_url) ->
  wrapper           = document.createElement('div')
  wrapper.id        = "wrapper_#{index}"
  wrapper.className = "image_wrapper"

  link      = document.createElement('a')
  link.id   = "kanji_#{index}"
  link.href = "#"

  im           = document.createElement('img')
  im.src       = image_url
  im.className = "image"

  wrapper.appendChild(link)
  link.appendChild(im)
  wrapper.onmouseover = () -> fillKanjiModal(index)
  wrapper.onmouseout  = hideKanjiModal
  $('#images')[0].appendChild(wrapper)

# Fills the modal window with definition information given an index of Kanji Element
fillKanjiModal = (index) ->
  modal = $('#kanji_modal')
  modal.css('visibility', 'visible')
  kanji_data = window.kanji[index - 1]

  index       = "Index: #{kanji_data.index}"
  english     = "English:     #{kanji_data.english}"
  on_reading  = "On Reading:  #{kanji_data.on}"
  kun_reading = "Kun Reading: #{kanji_data.kun}"

  modal[0].innerHTML  = "#{index}<br />#{on_reading}<br />#{kun_reading}<br />#{english}"

hideKanjiModal = () ->
  $('#kanji_modal').css('visibility', 'hidden')

# Mixes up the input values of the text box
scramble = (list) ->
  for i in [1..list.length*20]
    one = parseInt(Math.random() * list.length)
    two = parseInt(Math.random() * list.length)
    temp      = list[one]
    list[one] = list[two]
    list[two] = temp

clear = () ->
  $('#numbers')[0].innerHTML = ""

# Auto enters values from the lower/upperbound input zones into the text area
autofillInput = () ->
  lower = parseInt($("#lowerbound")[0].value)
  upper = parseInt($("#upperbound")[0].value)
  autofill(lower, upper)

autofill = (lower, upper) ->
  textbox = $('#numbers')[0]
  for index in [lower..upper]
    textbox.value += "#{index} "

## Mouse shit
# Store x and y mouse values into window.mouseX and mouseY
# Move modal to follow mouse position
reactToMouseMove = (event) ->
  window.mouseX = event.pageX
  window.mouseY = event.pageY
  modal = $('#kanji_modal')
  modal.css('top' , "#{window.mouseY - MODALHEIGHT + 5}px")
  modal.css('left', "#{window.mouseX + 5}px")

## Actual Data handling(like JSON crap)
# Store definition objects in window.kanji
prepareKanjiData = () ->
  $.get('../data/kanji_json.txt', (data) ->
    window.kanji = eval(data)
  )
