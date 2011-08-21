//This isn't really used yet!
window.onload = function() {
  document.getElementById('go').onclick = gotoGiven;
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
  url = page + '.html'
  alert(url)
  //send to URL
}
