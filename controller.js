/** @format */

var socket = io();

var isEditable = false;

var inputs = document.querySelectorAll('.input');

var touchTimer;

var layouts = ['gamepad', 'keyboard'];

var layout = layouts[getRandomInt(0, layouts.length - 1)];

document.body.setAttribute('data-layout', layout);

const onTouchStart = evt => {
  if (isEditable) return;

  var el = evt.currentTarget;
  el.classList.add('active');
  socket.emit('touchstart', el.textContent);
};

const onTouchEnd = evt => {
  if (isEditable) return;

  var el = evt.currentTarget;
  el.classList.remove('active');
  socket.emit('touchend', el.textContent);
};

const toggleEditMode = () => {
  document.body.classList.toggle('edit');
  isEditable = document.body.classList.contains('edit');
  inputs.forEach(input => input.setAttribute('contenteditable', isEditable));
};

for (let input of inputs) {
  // input.classList.add(input.textContent);
  input.addEventListener('touchstart', onTouchStart, false);
  input.addEventListener('mousedown', onTouchStart, false);
  input.addEventListener('touchend', onTouchEnd, false);
  input.addEventListener('mouseup', onTouchEnd, false);
}

document.addEventListener(
  'touchstart',
  evt => {
    if (evt.touches.length === 4) {
      touchTimer = setTimeout(() => {
        toggleEditMode();
      }, 1000);
    }
  },
  false
);

document.addEventListener(
  'touchend',
  evt => {
    clearInterval(touchTimer);
  },
  false
);

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
