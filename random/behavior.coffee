# Handles behavior of the random page
#
# random.html can spawn a grid of kanji images from what indexes are input into the text box.
# Mouseovers to the grid of kanji produce a small window with definition information.

MODALHEIGHT    = 100
MODALWIDTH     = 300
IMAGES_ELEMENT = null

$(document).ready( () ->
  IMAGES_ELEMENT = $('#images')[0]
  prepareKanjiData()
  window.element_data       = []
  $('#create'  )[0].onclick = extractInput
  $('#shuffle' )[0].onclick = shuffleGrid
  $('#autofill')[0].onclick = autofillInput
  $('#clear')[0].onclick    = clearInput
  $('#randomselect')[0].onclick = randomSelect
  $(document).mousemove(reactToMouseMove)
)

## Visual stuff, like populating the list or generating popup modals

# Takes all of the values in the text box and spawns the grid of kanji
extractInput = () ->
  input         = $('#numbers')[0].value

  input = input.replace(/\n/g, '  ')
  input = input.split(///\x20+///) # All Whitespace

  IMAGES_ELEMENT.innerHTML = ""
  window.element_data      = []
  for id in input
    if id != ""
      buildKanji(id)
      window.element_data[id] = [id]

shuffleGrid = () ->
  fillGrid(shuffle())

shuffle = () ->
  elements = []
  for num in window.element_data
    elements.push num if num
  scramble(elements)
  elements

fillGrid = (elements) ->
  IMAGES_ELEMENT.innerHTML = ""
  for id in elements
    buildKanji(id)

# Given a kanji index, appends the image for that Kanji to the grid if the image exists
createImage = (index, parent) ->
  # Make sure file exists
  image_url = "../image/#{index}.gif"
  $.ajax({
    url     : image_url,
    type    : 'HEAD',
    success : () -> buildImage(index, image_url, parent)
  })

# Constructs the HTML element for a kanji of given element
buildImage = (index, image_url, parent) ->
    kanji           = document.createElement('img')
    kanji.src       = image_url
    kanji.className = "image"
    parent.appendChild(kanji)

buildKanji = (index) ->
  wrapper           = document.createElement('div')
  wrapper.id        = "wrapper_#{index}"
  wrapper.className = "image_wrapper"

  link      = document.createElement('a')
  link.id   = "kanji_#{index}"
  link.href = "#"

  kanji_data = window.kanji[index - 1]
  symbol     = kanji_data['kanji']

  visual_debug = window.visual_debug

  if symbol != undefined and not visual_debug
    kanji           = document.createElement('span')
    kanji.innerHTML = symbol
    link.appendChild(kanji)
  else
    createImage(index, link)

  wrapper.appendChild(link)
  wrapper.onmouseover = () -> fillKanjiModal(index)
  wrapper.onmouseout  = hideKanjiModal
  wrapper.onclick     = () -> removeKanji(index, wrapper)
  IMAGES_ELEMENT.appendChild(wrapper)

# Sets up kanji element to be click-removeable
removeKanji = (index, element) ->
  element.onmouseover = undefined
  element.innerHTML   = ""
  hideKanjiModal()
  window.element_data[index] = undefined

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
  bounds = retrieve_bounds()
  lower = bounds[0]
  upper = bounds[1]
  autofill(lower, upper)

autofill = (lower, upper) ->
  textbox = $('#numbers')[0]
  for index in [lower..upper]
    textbox.value += " #{index} "

randomSelect = () ->
  bounds = retrieve_bounds()
  lower    = bounds[0]
  upper    = bounds[1]
  quantity = bounds[2]
  textbox  = $('#numbers')[0]
  for i in [1..quantity]
    textbox.value += " #{parseInt(Math.random() * (upper - lower)) + lower}"

retrieve_bounds = () ->
  lower = parseInt($("#lowerbound")[0].value)
  upper = parseInt($("#upperbound")[0].value)
  quantity = parseInt($("#quantity")[0].value)
  [lower, upper, quantity]

clearInput = () ->
  $('#numbers')[0].value = ""

## Mouse
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
    window.kanji = JSON.parse(data))
