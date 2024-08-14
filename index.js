const { app, BrowserWindow, Menu } = require('electron')
const path = require('path');

let mainWIndow = null;
let childWindow = null;

const createWindow = () => {
  mainWIndow = new BrowserWindow({
    width: 800,
    height: 600
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

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
  createWindow()
})
