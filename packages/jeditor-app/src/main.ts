import { app, BrowserWindow } from 'electron'
import path from 'path'

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
