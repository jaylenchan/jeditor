export interface PluginViewTrait {
  view: any
}

export interface IPlugin extends PluginViewTrait {
  id: string
}

export interface EditorPluginTrait {
  usePlugin(plugin: IPlugin): IEditor
  usePlugins(plugins: Array<IPlugin>): IEditor
  applyPlugins(): void
}

export interface EditorTrait {
  run(): void
}

export interface IEditor extends EditorPluginTrait, EditorTrait {}

export const TYPES = {
  JEditor: Symbol.for('JEditor'),
  Picture: Symbol.for('Picture'),
}
