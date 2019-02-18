const electron = require('electron');
const app = electron.app;
const browserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
var win;
createWindow = ()=>{
    win = new browserWindow({show:false});
    win.maximize();
    win.show();
    // win.loadFile(path.join(__dirname,"/public/index.html"));
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/public/index.html'),
        nodeIntegration: false,
        protocol: 'file',
        slashes:true
      }));
    win.webContents.openDevTools();
}
app.on('ready',createWindow);
