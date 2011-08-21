window.onload = function() {
  document.getElementById('create').onclick = spam;
}

function spam() {
  images = document.getElementById('images');
  input  = document.getElementById('numbers').value;

  input  = input.replace('\n', ' ').split(/ +/);
  shuffle(input);
  images.innerHTML = "";
  for(var i = 0; i < input.length; i++) {
    im     = document.createElement('img');
    im.src = "../image/"+ input[i] +".gif";
    im.style.width  = "80px";
    im.style.height = "80px";
    images.appendChild(im);
  }
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
