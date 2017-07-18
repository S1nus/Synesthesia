const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {ipcMain} = require('electron');
const windowStateKeeper = require('electron-window-state');

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow () {

  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });

  mainWindow = new BrowserWindow({width: mainWindowState.width, height: mainWindowState.height, resizable: true, frame: false})

  mainWindowState.manage(mainWindow);

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});

ipcMain.on('closeApp', function() {
  app.quit();
});

ipcMain.on('restoreApp', function() {
  if (mainWindow.isMaximized()) {
    mainWindow.restore();
  }
  else {
    mainWindow.maximize();
  }
});

ipcMain.on("minimizeApp", function() {
  mainWindow.minimize();
});
