(function () {

  'use strict';

  var canvas = document.getElementById('scratch'),
    context = canvas.getContext('2d'),
    container = document.getElementById('container');

  // default value
  context.globalCompositeOperation = 'source-over';

  //----------------------------------------------------------------------------

  var x = 0;
  var y = 0;

  // fill circle
  context.beginPath();
  context.fillStyle = '#b8964f';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = "20px system-ui";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#ffffff";
  context.fillText("Scratch here!", canvas.width / 2, canvas.height / 2);

  //----------------------------------------------------------------------------

  var isDrag = false;

  function clearArc(x, y) {
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.fillRect(x, y, 20, 40);
    // context.arc(x, y, 10, 0, Math.PI * 2, false);
    // context.fill();
  }

  canvas.addEventListener('mousedown', function (event) {
    isDrag = true;

    clearArc(event.offsetX, event.offsetY);
  }, false);

  canvas.addEventListener('mousemove', function (event) {
    if (!isDrag) {
      return;
    }

    clearArc(event.offsetX, event.offsetY);
  }, false);

  canvas.addEventListener('mouseup', function (event) {
    isDrag = false;
  }, false);

  canvas.addEventListener('mouseleave', function (event) {
    isDrag = false;
  }, false);

  //----------------------------------------------------------------------------

  canvas.addEventListener('touchstart', function (event) {
    if (event.targetTouches.length !== 1) {
      return;
    }
    let pos = { x: event.clientX, y: event.clientY };
    if (event.touches) {
      pos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    const rect = event.target.getBoundingClientRect();
    const x_rel = pos.x - rect.left;
    const y_rel = pos.y - rect.top;
    const x = Math.round((x_rel * event.target.width) / rect.width);
    const y = Math.round((y_rel * event.target.height) / rect.height);

    event.preventDefault();

    isDrag = true;

    clearArc(x, y);
  }, false);

  canvas.addEventListener('touchmove', function (event) {
    if (!isDrag || event.targetTouches.length !== 1) {
      return;
    }

    let pos = { x: event.clientX, y: event.clientY };
    if (event.touches) {
      pos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    const rect = event.target.getBoundingClientRect();
    const x_rel = pos.x - rect.left;
    const y_rel = pos.y - rect.top;
    const x = Math.round((x_rel * event.target.width) / rect.width);
    const y = Math.round((y_rel * event.target.height) / rect.height);

    event.preventDefault();

    clearArc(x, y);
  }, false);

  canvas.addEventListener('touchend', function (event) {
    isDrag = false;
  }, false);

  //----------------------------------------------------------------------------


}());
