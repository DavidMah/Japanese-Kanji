//This isn't really used yet!
window.onload = function() {
  document.getElementById('go').onclick = gotoGiven;
  document.onkeyup = keyPressed;
}

function gotoGiven() {
  page = document.getElementById('page').value;
  gotoPage(page);
}

function gotoRight() {
  page = parseInt(document.getElementById('kanji').innerHTML) + 1;
  gotoPage(page);
}
function gotoLeft() {
  page = parseInt(document.getElementById('kanji').innerHTML) - 1;
  gotoPage(page);
}
function gotoPage(page) {
  url = page + '.html';
  window.location = url;
}
function keyPressed(event) {
  if(event.keyCode == 37) {
    gotoLeft();
  } else if (event.keyCode == 39) {
    gotoRight();
  }
}
