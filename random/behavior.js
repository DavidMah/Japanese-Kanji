(function() {
  var MODALHEIGHT, MODALWIDTH, autofill, autofillInput, buildImage, clear, createImage, fillImages, fillKanjiModal, hideKanjiModal, prepareKanjiData, reactToMouseMove, shuffle;
  MODALHEIGHT = 100;
  MODALWIDTH = 300;
  $(document).ready(function() {
    $('#create')[0].onclick = fillImages;
    $('#autofill')[0].onclick = autofillInput;
    $(document).mousemove(reactToMouseMove);
    return prepareKanjiData();
  });
  fillImages = function() {
    var id, image, imagesElement, ims, input, _i, _len;
    imagesElement = $('#images')[0];
    input = $('#numbers')[0].value;
    input = input.replace(/\n/g, '  ');
    input = input.split(/\x20+/);
    shuffle(input);
    imagesElement.innerHTML = "";
    ims = [];
    for (_i = 0, _len = input.length; _i < _len; _i++) {
      id = input[_i];
      image = createImage(id);
    }
    return document.getElementById('numbers').value = input.join(" ");
  };
  createImage = function(index) {
    var image_url;
    image_url = "../image/" + index + ".gif";
    return $.ajax({
      url: image_url,
      type: 'HEAD',
      success: function() {
        return buildImage(index, image_url);
      }
    });
  };
  buildImage = function(index, image_url) {
    var im, link, wrapper;
    wrapper = document.createElement('div');
    wrapper.id = "wrapper_" + index;
    wrapper.className = "image_wrapper";
    link = document.createElement('a');
    link.id = "kanji_" + index;
    link.href = "#";
    im = document.createElement('img');
    im.src = image_url;
    im.className = "image";
    wrapper.appendChild(link);
    link.appendChild(im);
    wrapper.onmouseover = function() {
      return fillKanjiModal(index);
    };
    wrapper.onmouseout = hideKanjiModal;
    return $('#images')[0].appendChild(wrapper);
  };
  fillKanjiModal = function(index) {
    var english, kanji_data, kun_reading, modal, on_reading;
    modal = $('#kanji_modal');
    modal.css('visibility', 'visible');
    kanji_data = window.kanji[index - 1];
    index = "Index: " + kanji_data.index;
    english = "English:     " + (kanji_data.english.join(", "));
    on_reading = "On Reading:  " + (kanji_data.on.join(", "));
    kun_reading = "Kun Reading: " + (kanji_data.kun.join(", "));
    return modal[0].innerHTML = "" + index + "<br />" + on_reading + "<br />" + kun_reading + "<br />" + english;
  };
  hideKanjiModal = function() {
    return $('#kanji_modal').css('visibility', 'hidden');
  };
  shuffle = function(list) {
    var i, one, temp, two, _ref, _results;
    _results = [];
    for (i = 1, _ref = list.length * 20; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
      one = parseInt(Math.random() * list.length);
      two = parseInt(Math.random() * list.length);
      temp = list[one];
      list[one] = list[two];
      _results.push(list[two] = temp);
    }
    return _results;
  };
  clear = function() {
    return $('#numbers')[0].innerHTML = "";
  };
  autofillInput = function() {
    var lower, upper;
    lower = parseInt($("#lowerbound")[0].value);
    upper = parseInt($("#upperbound")[0].value);
    return autofill(lower, upper);
  };
  autofill = function(lower, upper) {
    var index, textbox, _results;
    textbox = $('#numbers')[0];
    _results = [];
    for (index = lower; lower <= upper ? index <= upper : index >= upper; lower <= upper ? index++ : index--) {
      _results.push(textbox.value += "" + index + " ");
    }
    return _results;
  };
  reactToMouseMove = function(event) {
    var modal;
    window.mouseX = event.pageX;
    window.mouseY = event.pageY;
    modal = $('#kanji_modal');
    modal.css('top', "" + (window.mouseY - MODALHEIGHT + 5) + "px");
    return modal.css('left', "" + (window.mouseX + 5) + "px");
  };
  prepareKanjiData = function() {
    return $.get('../data/kanji_json.txt', function(data) {
      return window.kanji = eval(data);
    });
  };
}).call(this);
