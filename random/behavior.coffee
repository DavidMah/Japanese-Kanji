window.onload = () ->
  $('#create'  )[0].onclick = fillImages
  $('#1to100'  )[0].onclick = () -> autofillInput(1, 100)
  $('#101to200')[0].onclick = () -> autofillInput(101, 200)
  $('#201to300')[0].onclick = () -> autofillInput(201, 300)
  prepareKanjiData()


## Visual stuff, like populating the list or generating popup modals

fillImages = () ->
  imagesElement = $('#images')[0]
  input         = $('#numbers')[0].value

  input = input.replace(/\n/g, '  ')
  input = input.split(///\x20+///) # All Spaces
  shuffle(input)

  imagesElement.innerHTML = ""
  document.getElementById('numbers').value = input.join(" ")
  ims = []
  for id in input
    image = createImage(id)


spawnKanjiModal = () ->
  index = parseInt(this.id.substring(6))

  modal = document.createElement('iframe')
  modal.className  = 'kanji_modal'
  modal.innerHTML  = 'here I am'

  modal.style.top  = "#{this.offsetTop - 250}px"
  modal.style.left = "#{this.offsetLeft - 50}px"



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

  label           = document.createElement('div')
  label.className = 'image_label'
  label.innerHTML = index

  wrapper.appendChild(link)
  link.appendChild(im)
  link.appendChild(label)
  wrapper.onclick = spawnKanjiModal
  $('#images')[0].appendChild(wrapper)


shuffle = (list) ->
  for i in [1..list.length*20]
    one = parseInt(Math.random() * list.length)
    two = parseInt(Math.random() * list.length)
    temp      = list[one]
    list[one] = list[two]
    list[two] = temp


autofillInput = (lower, upper) ->
  textbox = $('#numbers')[0]
  textbox.innerHTML = ""
  for index in [lower..upper]
    textbox.innerHTML += "#{index} "


## Actual Data handling(like JSON crap)

prepareKanjiData = () ->
  json_data = $.get('../data/kanji_json.txt').responseText
  window.kanji_json = eval(json_data)
