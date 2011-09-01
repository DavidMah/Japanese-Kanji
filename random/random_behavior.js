window.onload = function() {
  document.getElementById('create').onclick = fillImages;
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
   // ims[i].onclick = function() { spawnKanjiModal(ims[i])}
  }
}

function spawnKanjiModal(image) {
  var modal = document.createElement('iframe');
  modal.className = 'kanji_modal';
  modal.innerHTML = "here I am";

  modal.style.top  = (image.offsetTop - 250) +"px";
  modal.style.left = (image.offsetLeft - 50) +"px";

  document.body.appendChild(modal);
}

function createImage(index) {
  var wrapper    = document.createElement('div');
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
