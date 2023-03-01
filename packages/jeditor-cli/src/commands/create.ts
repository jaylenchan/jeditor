import type JEditorCli from '../cli'
import fs from 'fs-extra'
import path from 'path'

type Options = { plugin: boolean }

function createPluginTemplate() {
	const pluginTemplatePath = () => {
		return path.resolve(__dirname, '../../src/templates/plugin-template')
	}

	fs.copy(pluginTemplatePath(), process.cwd())
}

function useTemplate(options: Options) {
	const templates = {
		plugin: createPluginTemplate,
	}

	Object.keys(options).forEach(option => {
		templates[option as keyof typeof templates]()
	})
}

function useTypeAction(type: string, options: Options) {
	const actionTypes = {
		template: useTemplate(options),
	}

	actionTypes[type as keyof typeof actionTypes]
}

const create = (cli: JEditorCli) => {
	cli
		.command('create <type>')
		.option('--plugin', 'create plugin template')
		.action((type, options) => {
			useTypeAction(type, options)
		})
}

export default create
