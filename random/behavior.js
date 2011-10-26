(function() {
  var IMAGES_ELEMENT, MODALHEIGHT, MODALWIDTH, autofill, autofillInput, buildImage, clear, createImage, extractInput, fillGrid, fillKanjiModal, hideKanjiModal, prepareKanjiData, reactToMouseMove, removeKanji, scramble, shuffle, shuffleGrid;
  MODALHEIGHT = 100;
  MODALWIDTH = 300;
  IMAGES_ELEMENT = null;
  $(document).ready(function() {
    IMAGES_ELEMENT = $('#images')[0];
    window.element_data = [];
    $('#create')[0].onclick = extractInput;
    $('#shuffle')[0].onclick = shuffleGrid;
    $('#autofill')[0].onclick = autofillInput;
    $(document).mousemove(reactToMouseMove);
    return prepareKanjiData();
  });
  extractInput = function() {
    var id, input, _i, _len, _results;
    input = $('#numbers')[0].value;
    input = input.replace(/\n/g, '  ');
    input = input.split(/\x20+/);
    IMAGES_ELEMENT.innerHTML = "";
    window.element_data = [];
    _results = [];
    for (_i = 0, _len = input.length; _i < _len; _i++) {
      id = input[_i];
      createImage(id);
      _results.push(window.element_data[id] = [id]);
    }
    return _results;
  };
  shuffleGrid = function() {
    return fillGrid(shuffle());
  };
  shuffle = function() {
    var elements, num, _i, _len, _ref;
    elements = [];
    _ref = window.element_data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      num = _ref[_i];
      if (num) {
        elements.push(num);
      }
    }
    scramble(elements);
    return elements;
  };
  fillGrid = function(elements) {
    var id, _i, _len, _results;
    IMAGES_ELEMENT.innerHTML = "";
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      id = elements[_i];
      _results.push(createImage(id));
    }
    return _results;
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
    wrapper.onclick = function() {
      return removeKanji(index, wrapper);
    };
    return IMAGES_ELEMENT.appendChild(wrapper);
  };
  removeKanji = function(index, element) {
    element.onmouseover = void 0;
    element.innerHTML = "";
    hideKanjiModal();
    return window.element_data[index] = void 0;
  };
  fillKanjiModal = function(index) {
    var english, kanji_data, kun_reading, modal, on_reading;
    modal = $('#kanji_modal');
    modal.css('visibility', 'visible');
    kanji_data = window.kanji[index - 1];
    index = "Index: " + kanji_data.index;
    english = "English:     " + kanji_data.english;
    on_reading = "On Reading:  " + kanji_data.on;
    kun_reading = "Kun Reading: " + kanji_data.kun;
    return modal[0].innerHTML = "" + index + "<br />" + on_reading + "<br />" + kun_reading + "<br />" + english;
  };
  hideKanjiModal = function() {
    return $('#kanji_modal').css('visibility', 'hidden');
  };
  scramble = function(list) {
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
