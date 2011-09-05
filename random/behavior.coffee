MODALHEIGHT = 100
MODALWIDTH  = 300

$(document).ready( () ->
  $('#create'  )[0].onclick = fillImages
  $('#autofill')[0].onclick = autofillInput
  $(document).mousemove(reactToMouseMove)
  prepareKanjiData()
)
## Visual stuff, like populating the list or generating popup modals

fillImages = () ->
  imagesElement = $('#images' )[0]
  input         = $('#numbers')[0].value

  input = input.replace(/\n/g, '  ')
  input = input.split(///\x20+///) # All Whitespace
  shuffle(input)

  imagesElement.innerHTML = ""
  ims = []
  for id in input
    image = createImage(id)

  document.getElementById('numbers').value = input.join(" ")


createImage = (index) ->
  # Make sure file exists
  url = "../image/#{index}.gif"
  $.ajax({
    url     : url,
    type    : 'HEAD',
    success : () -> buildImage(index)
  })


buildImage = (index) ->
  wrapper           = document.createElement('div')
  wrapper.id        = "wrapper_#{index}"
  wrapper.className = "image_wrapper"

  link      = document.createElement('a')
  link.id   = "kanji_#{index}"
  link.href = "#"

  im           = document.createElement('img')
  im.src       = "../image/#{index}.gif"
  im.className = "image"

  wrapper.appendChild(link)
  link.appendChild(im)
  wrapper.onmouseover = () -> fillKanjiModal(index, this)
  wrapper.onmouseout  = hideKanjiModal
  $('#images')[0].appendChild(wrapper)


fillKanjiModal = (index, wrapper) ->
  modal = $('#kanji_modal')
  modal.css('visibility', 'visible')
  kanji_data = window.kanji[index]

  index       = "Index: #{kanji_data.index}"
  english     = "English:     #{kanji_data.english.join(", ")}"
  on_reading  = "On Reading:  #{kanji_data.on.join(", ")}"
  kun_reading = "Kun Reading: #{kanji_data.kun.join(", ")}"

  modal[0].innerHTML  = "#{index}<br />#{on_reading}<br />#{kun_reading}<br />#{english}"


hideKanjiModal = () ->
  $('#kanji_modal').css('visibility', 'hidden')


shuffle = (list) ->
  for i in [1..list.length*20]
    one = parseInt(Math.random() * list.length)
    two = parseInt(Math.random() * list.length)
    temp      = list[one]
    list[one] = list[two]
    list[two] = temp


clear = () ->
  $('#numbers')[0].innerHTML = ""


autofillInput = () ->
  lower = parseInt($("#lowerbound")[0].value)
  upper = parseInt($("#upperbound")[0].value)
  autofill(lower, upper)


autofill = (lower, upper) ->
  textbox = $('#numbers')[0]
  for index in [lower..upper]
    textbox.value += "#{index} "

## Mouse shit

reactToMouseMove = (event) ->
  window.mouseX = event.pageX
  window.mouseY = event.pageY
  modal = $('#kanji_modal')
  modal.css('top' , "#{window.mouseY - MODALHEIGHT + 5}px")
  modal.css('left', "#{window.mouseX + 5}px")

## Actual Data handling(like JSON crap)

prepareKanjiData = () ->
  $.get('../data/kanji_json.txt', (data) ->
    window.kanji = eval(data)
  )
