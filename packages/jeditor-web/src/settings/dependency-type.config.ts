const Editor = {
	JEditor: Symbol.for('JEditor'),
}

const Services = {
	EditorPluginService: Symbol.for('EditorPluginService'),
	ReactivityService: Symbol.for('ReactivityService'),
	ModelService: Symbol.for('ModelService'),
	BoardService: Symbol.for('BoardService'),
	PropPanelService: Symbol.for('PropPanelService'),
	PropPanelPluginService: Symbol.for('PropPanelPluginService'),
}

const BuiltInPlugins = {
	Whiteboard: Symbol.for('Whiteboard'),
	PropPanel: Symbol.for('PropPanel'),
}

const Extensions = {
	Picture: Symbol.for('Picture'),
	Text: Symbol.for('Text'),
}

export default Object.assign(Editor, Services, BuiltInPlugins, Extensions)
