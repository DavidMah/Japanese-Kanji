(function() {
  var IMAGES_ELEMENT, MODALHEIGHT, MODALWIDTH, autofill, autofillInput, buildImage, buildKanji, clear, clearInput, createImage, extractInput, fillGrid, fillKanjiModal, hideKanjiModal, prepareKanjiData, randomSelect, reactToMouseMove, removeKanji, retrieve_bounds, scramble, shuffle, shuffleGrid;
  MODALHEIGHT = 100;
  MODALWIDTH = 300;
  IMAGES_ELEMENT = null;
  $(document).ready(function() {
    IMAGES_ELEMENT = $('#images')[0];
    prepareKanjiData();
    window.element_data = [];
    $('#create')[0].onclick = extractInput;
    $('#shuffle')[0].onclick = shuffleGrid;
    $('#autofill')[0].onclick = autofillInput;
    $('#clear')[0].onclick = clearInput;
    $('#randomselect')[0].onclick = randomSelect;
    return $(document).mousemove(reactToMouseMove);
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
      _results.push(id !== "" ? (buildKanji(id), window.element_data[id] = [id]) : void 0);
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
      _results.push(buildKanji(id));
    }
    return _results;
  };
  createImage = function(index, parent) {
    var image_url;
    image_url = "../image/" + index + ".gif";
    return $.ajax({
      url: image_url,
      type: 'HEAD',
      success: function() {
        return buildImage(index, image_url, parent);
      }
    });
  };
  buildImage = function(index, image_url, parent) {
    var kanji;
    kanji = document.createElement('img');
    kanji.src = image_url;
    kanji.className = "image";
    return parent.appendChild(kanji);
  };
  buildKanji = function(index) {
    var kanji, kanji_data, link, symbol, visual_debug, wrapper;
    wrapper = document.createElement('div');
    wrapper.id = "wrapper_" + index;
    wrapper.className = "image_wrapper";
    link = document.createElement('a');
    link.id = "kanji_" + index;
    link.href = "#";
    kanji_data = window.kanji[index - 1];
    symbol = kanji_data['kanji'];
    visual_debug = window.visual_debug;
    if (symbol !== void 0 && !visual_debug) {
      kanji = document.createElement('span');
      kanji.innerHTML = symbol;
      link.appendChild(kanji);
    } else {
      createImage(index, link);
    }
    wrapper.appendChild(link);
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
    var bounds, lower, upper;
    bounds = retrieve_bounds();
    lower = bounds[0];
    upper = bounds[1];
    return autofill(lower, upper);
  };
  autofill = function(lower, upper) {
    var index, textbox, _results;
    textbox = $('#numbers')[0];
    _results = [];
    for (index = lower; lower <= upper ? index <= upper : index >= upper; lower <= upper ? index++ : index--) {
      _results.push(textbox.value += " " + index + " ");
    }
    return _results;
  };
  randomSelect = function() {
    var bounds, index, lower, textbox, upper, _results;
    bounds = retrieve_bounds();
    lower = bounds[0];
    upper = bounds[1];
    textbox = $('#numbers')[0];
    _results = [];
    for (index = lower; lower <= upper ? index <= upper : index >= upper; lower <= upper ? index++ : index--) {
      _results.push(textbox.value += " " + (parseInt(Math.random() * (upper - lower)) + lower));
    }
    return _results;
  };
  retrieve_bounds = function() {
    var lower, upper;
    lower = parseInt($("#lowerbound")[0].value);
    upper = parseInt($("#upperbound")[0].value);
    return [lower, upper];
  };
  clearInput = function() {
    return $('#numbers')[0].value = "";
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
      return window.kanji = JSON.parse(data);
    });
  };
}).call(this);
