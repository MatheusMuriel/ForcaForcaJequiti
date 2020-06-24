import { app, BrowserWindow } from "electron";

declare const ENVIRONMENT: String;

const IS_DEV = ENVIRONMENT == "development";
const DEV_SERVER_URL = "http://localhost:9000";
const HTML_FILE_PATH = "index.html";


const zerorpc = require("zerorpc");
const ipc = require('electron').ipcMain;
const { spawn } = require('child_process');

let ui: any;
let spawnedChild: any;
let zerorpcClient: any;

function connectToZeroRPC() {
    zerorpcClient = new zerorpc.Client();
    zerorpcClient.connect('tcp://127.0.0.1:4242');

    ipc.on('hello', () => {
        zerorpcClient.invoke('hello', 'RPC', (error, res, more) => {
            ui.webContents.send('hello-response', res);
            // myConsole.log(res);
        });
    });

    ipc.on('array', () => {
        zerorpcClient.invoke('get_array', (error, res, more) => {
            ui.webContents.send('array-response', res);
        });
    });

    ipc.on('object', () => {
        zerorpcClient.invoke('get_object', (error, res, more) => {
            ui.webContents.send('object-response', res);
        });
    });

    ipc.on('type', (event, val) => {
        zerorpcClient.invoke('determine_type', val, (error, res, more) => {
            ui.webContents.send('type-response', res);
        });
    });
}




let win: BrowserWindow | null = null;


function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.removeMenu();

    if (IS_DEV) {
        win.loadURL(DEV_SERVER_URL);
        win.webContents.openDevTools();
    }
    else {
        win.loadFile(HTML_FILE_PATH);
    }


    win.on("closed", () => {
        win = null
    })
}

app.on("ready", () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
