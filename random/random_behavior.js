window.onload = function() {
  document.getElementById('create'  ).onclick = fillImages;
  document.getElementById('1..100'  ).onclick = function() { autofillInput(1, 100)};
  document.getElementById('101..200').onclick = function() { autofillInput(101, 200)};
  document.getElementById('201..300').onclick = function() { autofillInput(201, 300)};
}

function fillImages() {
  var imagesElement = document.getElementById('images');
  var input         = document.getElementById('numbers').value;

  input  = input.replace(/\n/g, '  ')
  input  = input.split(/ +/);
  shuffle(input);
  imagesElement.innerHTML = "";
  document.getElementById('numbers').value = input.join(" ");
  var ims = []
  for(var i = 0; i < input.length; i++) {
    var image = createImage(input[i]);
    imagesElement.appendChild(image);
    ims.push(image);
  }

  for(var i = 0; i < ims.length; i++) {
   // ims[i].onclick = spawnKanjiModal
  }
}

function spawnKanjiModal() {
  index = parseInt(this.id.substring(6))
  var modal = document.createElement('iframe');
  modal.className = 'kanji_modal';
  modal.innerHTML = "here I am";

  modal.style.top  = (this.offsetTop - 250) +"px";
  modal.style.left = (this.offsetLeft - 50) +"px";

  document.body.appendChild(modal);
}

function createImage(index) {
  var wrapper    = document.createElement('div');
  wrapper.id     = "wrapper_"+ index;
  wrapper.className = 'image_wrapper';

  var link       = document.createElement('a');
  //link.href      = "#";
  link.id        = 'kanji_' + index
  link.href      = "../final/"+ index +".html";

  var im       = document.createElement('img');
  im.src       = "../image/"+ index +".gif";
  im.className = 'image';

  var id       = document.createElement('div');
  id.innerHTML = index
  id.className = "image_label"

  wrapper.appendChild(link);
  link.appendChild(im);
  link.appendChild(id);
  return wrapper;
}

function shuffle(list) {
  for(var i = 0; i < list.length * 20; i++) {
    var one   = parseInt(Math.random() * list.length);
    var two   = parseInt(Math.random() * list.length);
    var temp  = list[one];
    list[one] = list[two];
    list[two] = temp;
  }
}

function autofillInput(lower, upper) {
  var textbox = document.getElementById('numbers');
  textbox.innerHTML = "";
  for(var i = lower; i <= upper; i++) {
    textbox.innerHTML += i +" ";
  }
  //fillImages();
}
