const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  changePreferences: (data) => ipcRenderer.send('change-preferences', data)
})
