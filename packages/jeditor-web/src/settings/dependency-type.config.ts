const Core = {
	EditorPluginService: Symbol.for('EditorPluginService'),
	BoardService: Symbol.for('BoardService'),
	PropPanelService: Symbol.for('PropPanelService'),
	PropPanelPluginService: Symbol.for('PropPanelPluginService'),
	ModelService: Symbol.for('ModelService'),
	AppContainer: Symbol.for('AppContainer'),
	JEditor: Symbol.for('JEditor'),
}

const BuiltInPlugins = {
	Whiteboard: Symbol.for('Whiteboard'),
	PropPanel: Symbol.for('PropPanel'),
}

const Extensions = {
	Picture: Symbol.for('Picture'),
	Text: Symbol.for('Text'),
}

export default Object.assign(Core, BuiltInPlugins, Extensions)
