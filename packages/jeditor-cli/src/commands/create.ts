import path from 'path'

import * as fs from 'fs-extra'

import type JEditorCli from '../cli'


type Options = { plugin: boolean }

function createPluginTemplate(): void {
	const pluginTemplatePath = (): string => {
		return path.resolve(__dirname, '../../src/templates/plugin-template')
	}

	fs.copy(pluginTemplatePath(), process.cwd())
}

function useTemplate(options: Options): void {
	const templates = {
		plugin: createPluginTemplate,
	}

	Object.keys(options).forEach(option => {
		templates[option as keyof typeof templates]()
	})
}

function useTypeAction(type: string, options: Options): void {
	const actionTypes = {
		template: useTemplate(options),
	}

	actionTypes[type as keyof typeof actionTypes]
}

const create = (cli: JEditorCli): void => {
	cli
		.command('create <type>')
		.option('--plugin', 'create plugin template')
		.action((type, options) => {
			useTypeAction(type, options)
		})
}

export default create
