import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import express from 'express'
import Datastore from 'nedb'
import path, { join } from 'path'
import icon from '../../resources/icon.png?asset'

import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import historyRoutes from './routes/historyRoutes'
import productsRoutes from './routes/productsRoutes'
import warehouseRoutes from './routes/warehouseRoutes'

dotenv.config({ path: path.join(__dirname, '.env') })

// Path to database file

let serverProcess: any
let db: any
const expressApp = express()

async function initializeDatabase() {
  try {
    db = new Datastore({ filename: 'my_database.db', autoload: true })

    // Check if the document exists and initialize if necessary
    new Promise((resolve, reject) => {
      // Use a Promise
      db.findOne({}, (err, doc) => {
        if (err) {
          console.error('Error checking database:', err)
          reject(err) // Reject the promise on error
          return
        }

        if (!doc) {
          // If the database is empty
          const initialData = {
            products: [],
            history: [],
            returnedGoods: [],
            category: [],
            warehouses: [],
            authCredentials: {
              developerName: 'ugonna',
              developerPhoneNumber: '08101330834',
              password: ''
            }
          }

          db.insert(initialData, (insertErr, newDoc) => {
            if (insertErr) {
              console.error('Error initializing database:', insertErr)
              reject(insertErr) // Reject the promise on error
            } else {
              console.log('Database initialized with empty arrays:', newDoc)
              resolve('Database ready.') // Resolve the promise after successful insertion
            }
          })
        } else {
          resolve('Database ready.') // Resolve if the document already exists
        }
      })
    })
  } catch (err) {
    console.error('Database initialization error:', err)
    dialog.showErrorBox('Error', 'Failed to initialize the database. Exiting.')
    app.quit()
  }
}

function startExpressServer() {
  // Pass db as argument
  const PORT = process.env.PORT || 9000

  expressApp.use(express.json())
  expressApp.use(express.urlencoded({ extended: true }))
  expressApp.use(cors())

  // Routes
  expressApp.use('/api/category', categoryRoutes)
  expressApp.use('/api/products', productsRoutes)
  expressApp.use('/api/history', historyRoutes)
  expressApp.use('/api/auth', authRoutes)
  expressApp.use('/api/warehouses', warehouseRoutes)

  const server = expressApp.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
  })

  return server // Return the server instance
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  await initializeDatabase()

  createWindow()
  const server = startExpressServer()
  serverProcess = server

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.close(() => {
      // Close the server gracefully before quitting
      console.log('Express server closed.')
    })
  }
})

export default db
