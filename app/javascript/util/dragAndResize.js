export default function setupDraggingAndResizing(dataType) {
  setupResizable(dataType);
  setupDraggable(dataType);
};

function setupResizable(dataType){
  const resizeEl = document.querySelector(`[data-resizable-${dataType}]`);
  resizeEl.style.setProperty('resize', 'both');
  resizeEl.style.setProperty('overflow', 'hidden');
}

function setupDraggable(dataType) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const draggableEl = document.querySelector(`[data-draggable-${dataType}]`);
  const dragHandleEl = document.querySelector(`[data-drag-handle-${dataType}]`);
  draggableEl.style.setProperty('position', 'absolute');
  dragHandleEl.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    draggableEl.style.top = (draggableEl.offsetTop - pos2) + "px";
    draggableEl.style.left = (draggableEl.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}