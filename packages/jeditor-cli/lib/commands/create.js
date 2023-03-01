'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const fs_extra_1 = __importDefault(require('fs-extra'))
const path_1 = __importDefault(require('path'))
function createPluginTemplate() {
  const pluginTemplatePath = () => {
    return path_1.default.resolve(
      __dirname,
      '../../src/templates/plugin-template'
    )
  }
  fs_extra_1.default.copy(pluginTemplatePath(), process.cwd())
}
function useTemplate(options) {
  const templates = {
    plugin: createPluginTemplate,
  }
  Object.keys(options).forEach(option => {
    templates[option]()
  })
}
function useTypeAction(type, options) {
  const actionTypes = {
    template: useTemplate(options),
  }
  actionTypes[type]
}
const create = cli => {
  cli
    .command('create <type>')
    .option('--plugin', 'create plugin template')
    .action((type, options) => {
      useTypeAction(type, options)
    })
}
exports.default = create
