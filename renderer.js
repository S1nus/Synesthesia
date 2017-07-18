const {ipcRenderer} = require("electron");

document.addEventListener("DOMContentLoaded", function() {
  exitButton = document.getElementsByTagName("button")[2];
  restoreButton = document.getElementsByTagName("button")[1];
  minimizeButton = document.getElementsByTagName("button")[0];
  exitButton.addEventListener("click", function() {
    ipcRenderer.send("closeApp");
  });
  restoreButton.addEventListener("click", function() {
    ipcRenderer.send("restoreApp");
  });
  minimizeButton.addEventListener("click", function() {
    ipcRenderer.send("minimizeApp");
  });

  //drag n drop
  dnd = document.getElementById("dragndrop");
  dnd.addEventListener("drag", function() {
    dnd.addClass('is-dragover');
  });
  dnd.addEventListener("dragleave", function() {
    dnd.removeClass('is-dragover');
  });

  canvas = document.getElementById("canvas");
  page = new Page(canvas);
});
