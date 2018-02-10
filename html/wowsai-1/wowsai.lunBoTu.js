window.onload = function() {
  var list = document.getElementById('list');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');

  function animate(offset) {
    var newLeft = parseInt(list.style.left) + offset;
    list.style.left = newLeft + 'px';
    if (newLeft < -8335) {
      list.style.left = 0 + "px";
    }
    if (newLeft > 0) {
      list.style.left = -8335 + "px";
    }
  }

  var timer;

  function play() {
    timer = setInterval(function() {
      next.onclick()
    }, 2000)
  }
  play();


  var container = document.getElementById('container1');

  function stop() {
    clearInterval(timer);
  }
  container.onmouseover = stop;
  container.onmouseout = play;


  var buttons = document.getElementById('buttons').getElementsByTagName('span');
  var index = 0;

  function buttonsShow() {

    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].className == 'on') {
        buttons[i].className = '';
      }
    }

    buttons[index].className = 'on';
  }

  prev.onclick = function() {
    index -= 1;
    if (index < 0) {
      index = 5;
    }
    buttonsShow();
    animate(1665);
  }
  next.onclick = function() {

    index += 1;
    if (index > 5) {
      index = 0;
    }
    buttonsShow();
    animate(-1665);
  }


  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {

      console.log(i);


      var clickIndex = parseInt(this.getAttribute('index'));
      var offset = 1665 * (index - clickIndex);
      animate(offset);
      index = clickIndex;
      buttonsShow();
    }
  }
  container1.onmouseover = stop;
  container1.onmouseout = play;
}
