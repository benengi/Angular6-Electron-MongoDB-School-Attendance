const { app, BrowserWindow } = require('electron');
var server = require('./server');
const path = require('path');
const url = require('url');
let win;

const os = require('os');

const ipc = require('electron').ipcMain;
const shell = require('electron').shell;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1300, 
    height: 1000,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })


  win.loadURL(`file://${__dirname}/dist/school/index.html`)
  win.maximize();

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

/*
ipc.on('generateReport', event => {
  const pdfPath = path.join(os.tmpdir(), 'report.pdf');
  const win = BrowserWindow.fromWebContents(event.sender);

  win.webContents.printToPDF({}, (error, data) => {
    if (error) return console.log(error.message);

    fs.writeFile(pdfPath, data, err => {
      if (err) return console.log(err.message);
      shell.openExternal('file://' + pdfPath);
     // event.sender.send('wrote-pdf', pdfPath);
    })
})
})

*/