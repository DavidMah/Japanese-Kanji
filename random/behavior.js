(function() {
  var autofillInput, buildImage, createImage, fillImages, prepareKanjiData, shuffle, spawnKanjiModal;
  window.onload = function() {
    $('#create')[0].onclick = fillImages;
    $('#1to100')[0].onclick = function() {
      return autofillInput(1, 100);
    };
    $('#101to200')[0].onclick = function() {
      return autofillInput(101, 200);
    };
    $('#201to300')[0].onclick = function() {
      return autofillInput(201, 300);
    };
    return prepareKanjiData();
  };
  fillImages = function() {
    var id, image, imagesElement, ims, input, _i, _len, _results;
    imagesElement = $('#images')[0];
    input = $('#numbers')[0].value;
    input = input.replace(/\n/g, '  ');
    input = input.split(/\x20+/);
    shuffle(input);
    imagesElement.innerHTML = "";
    document.getElementById('numbers').value = input.join(" ");
    ims = [];
    _results = [];
    for (_i = 0, _len = input.length; _i < _len; _i++) {
      id = input[_i];
      _results.push(image = createImage(id));
    }
    return _results;
  };
  spawnKanjiModal = function() {
    var index, modal;
    index = parseInt(this.id.substring(6));
    modal = document.createElement('iframe');
    modal.className = 'kanji_modal';
    modal.innerHTML = 'here I am';
    modal.style.top = "" + (this.offsetTop - 250) + "px";
    return modal.style.left = "" + (this.offsetLeft - 50) + "px";
  };
  createImage = function(index) {
    var url;
    url = "../image/" + index + ".gif";
    return $.ajax({
      url: url,
      type: 'HEAD',
      success: function() {
        return buildImage(index);
      }
    });
  };
  buildImage = function(index) {
    var im, label, link, wrapper;
    wrapper = document.createElement('div');
    wrapper.id = "wrapper_" + index;
    wrapper.className = "image_wrapper";
    link = document.createElement('a');
    link.id = "kanji_" + index;
    link.href = "#";
    im = document.createElement('img');
    im.src = "../image/" + index + ".gif";
    im.className = "image";
    label = document.createElement('div');
    label.className = 'image_label';
    label.innerHTML = index;
    wrapper.appendChild(link);
    link.appendChild(im);
    link.appendChild(label);
    wrapper.onclick = spawnKanjiModal;
    return $('#images')[0].appendChild(wrapper);
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
  autofillInput = function(lower, upper) {
    var index, textbox, _results;
    textbox = $('#numbers')[0];
    textbox.innerHTML = "";
    _results = [];
    for (index = lower; lower <= upper ? index <= upper : index >= upper; lower <= upper ? index++ : index--) {
      _results.push(textbox.innerHTML += "" + index + " ");
    }
    return _results;
  };
  prepareKanjiData = function() {
    var json_data;
    json_data = $.get('../data/kanji_json.txt').responseText;
    return window.kanji_json = eval(json_data);
  };
}).call(this);
