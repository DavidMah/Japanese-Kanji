window.onload = () ->
  document.getElementById('create'  ).onclick = fillImages
  document.getElementById('1..100'  ).onclick = () -> autofillInput(1, 100)
  document.getElementById('101..200').onclick = () -> autofillInput(101, 200)
  document.getElementById('201..300').onclick = () -> autofillInput(201, 300)

fillImages = () ->
  imagesElement = document.getElementById('images')
  input         = document.getElementById('numbers').value

  input = input.replace(/\n/g, '  ')
  input = input.split(///  +///)
  shuffle(input)

  imagesElement.innerHTML = ""
  document.getElementById('numbers').value = input.join(" ")
  ims = []
  for id in input
    image = createImage(id)
    imagesElement.appendChild(image)
    ims.push(image)

  for image_element in ims
    5
    # image_element.onclick = spawnKanjiModal

spawnKanjiModal = () ->
  index = parseInt(this.id.substring(6))

  modal = document.createElement('iframe')
  modal.className = 'kanji_modal'
  modal.innerHTML = 'here I am'

  modal.style.top  = (this.offsetTop - 250) + "px"
  modal.style.left = (this.offsetLeft - 50) + "px"

  document.body.appendChild(modal)

createImage = (index) ->
  wrapper           = document.createElement('div')
  wrapper.id        = 'wrapper_' + index
  wrapper.className = 'image_wrapper'

  link      = document.createElement('a')
  link.id   = 'kanji_' + index
  link.href = "../final/" + index + ".html"

  im           = document.createElement('img')
  im.src       = "../image/" + index + ".gif"
  im.className = "image"

  wrapper.appendChild(link)
  link.appendChild(im)
  link.appendChild(id)
  wrapper

shuffle = (list) ->
  for i in [1..list.length*20]
    one = parseInt(Math.random() * list.length)
    two = parseInt(Math.random() * list.length)
    temp      = list[one]
    list[one] = list[two]
    list[two] = temp

autofillInput = (lower, upper) ->
  textbox = document.getElementById('numbers')
  textbox.innerHTMl = ""
  for index in [lower..upper]
    textbox.innerHTML += index + " "
