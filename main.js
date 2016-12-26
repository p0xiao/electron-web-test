const electron = require('electron');
const path = require('path');
const http = require('http');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const Tray = electron.Tray;
const ipc = electron.ipcMain;

let mainWindow;
let appIcon;
const menuTemplate = [{
  label: '编辑',
  submenu: [{
    label: '刷新',
    role: 'reload'
  }, {
    label: '撤销',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: '重做',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: '退出',
    accelerator: 'Alt+F4',
    click: function() {
      app.quit();
    }
  }]
}, {
  label: '帮助',
  role: 'help',
  submenu: [{
    label: '更新',
    click: function() {
      electron.shell.openExternal('http://hmp.dev.cim120.cn');
    }
  }, {
    label: '开发者工具',
    role: 'toggledevtools'
  }]
}];

const trayMenuTemplate = [{
  label: '退出',
  click: function() {
    app.quit();
    // appIcon.setImage(path.join(__dirname, 'ico.ico'));
  }
}];

const rightMenu = new Menu();
rightMenu.append(new MenuItem({
  label: '刷新',
  role: 'reload'
}));

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'HMP',
    width: 1440,
    height: 900
    // webPreferences: {
    //   nodeIntegration: false
    // }
    // frame: false
  });

  mainWindow.loadURL('http://localhost:8080');
  // mainWindow.loadURL('file://' + __dirname + "/index.html");
  // mainWindow.webContents.executeJavaScript(`
  //     document.getElementById("testBtn").addEventListener("click", function() {
  //       require("electron").ipcRenderer.send("quit");
  //     });
  // `);
  // mainWindow.webContents.openDevTools();

  let menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

function createTray() {
  let trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
  let iconPath = path.join(__dirname, 'favicon.ico');
  appIcon = new Tray(iconPath);
  appIcon.setToolTip('hmp');
  appIcon.setContextMenu(trayMenu);
}

app.on('ready', function() {
  createWindow();
  createTray();
});

ipc.on('logout-event', function(event, arg) {
  console.log(arg);
});

app.on('window-all-closed', function() {
  if (appIcon) appIcon.destroy();
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('browser-window-created', function(event, win) {
  win.webContents.on('context-menu', function(e, params) {
    rightMenu.popup(win, params.x, params.y);
  });
});

ipc.on('quit', function(event) {
  electron.shell.openExternal('http://hmp.dev.cim120.cn');
});
