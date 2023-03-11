import path from 'path'

import { app, BrowserWindow } from 'electron'

const ui = (): string => path.resolve(__dirname, './index.html')

const createWindow = (): void => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
	})

	win.loadFile(ui())
}

app.whenReady().then((): void => {
	createWindow()
})
