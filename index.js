const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path');

let mainWIndow = null;
let childWindow = null;

const createWindow = () => {
  mainWIndow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWIndow.loadFile('templates/index.html')
}
async function createPrefWindow() {
  childWindow = new BrowserWindow({
    height: 300,
    width: 300,
    //show: false,
    minimizable: false,
    maximizable: false,
    parent: mainWIndow,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  childWindow.webContents.on('dom-ready', () => {
    childWindow.show();
  });
  //configCapacitor(childWindow);
  childWindow.removeMenu();
  childWindow.loadURL(`file://${__dirname}/templates/preferences.html`);
}

const template = [
  {
    label: "File",
    submenu: [
      { label: "save" }
    ]
  },
  {
    label: "Edit",
    submenu: [
      {
        label: "preferences",
        accelerator: "F1",
        click: async () => {
          createPrefWindow();
        }
      }
    ]
  }
]

function changePreferences(event, data) {
  const { size, color, font } = data
  if (mainWIndow) {
    mainWIndow.webContents.insertCSS(`#content{ font-size: ${size}px; color: ${color}; font-family:${font} }`)
  }
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
  ipcMain.on("change-preferences", changePreferences)
  createWindow()
})
