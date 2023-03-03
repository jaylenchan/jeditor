import path from 'path'

import { app, BrowserWindow } from 'electron'

const ui = () => path.resolve(__dirname, './index.html')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
	})

	win.loadFile(ui())
}

app.whenReady().then(() => {
	createWindow()
})
