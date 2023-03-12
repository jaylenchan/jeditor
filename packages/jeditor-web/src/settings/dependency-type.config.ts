const Editor = {
	JEditor: Symbol.for('JEditor'),
}

const Services = {
	ReactivityService: Symbol.for('ReactivityService'),
	ModelService: Symbol.for('ModelService'),
	WhiteboardService: Symbol.for('WhiteboardService'),
	EditorPluginService: Symbol.for('EditorPluginService'),
	PropPanelService: Symbol.for('PropPanelService'),
	PropPanelPluginService: Symbol.for('PropPanelPluginService'),
	ToolPanelService: Symbol.for('ToolPanelService'),
}

const BuiltInPlugins = {
	Whiteboard: Symbol.for('Whiteboard'),
	PropPanel: Symbol.for('PropPanel'),
	ToolPanel: Symbol.for('ToolPanel'),
}

const Extensions = {
	Picture: Symbol.for('Picture'),
	Text: Symbol.for('Text'),
}

const Symbols = Object.assign(Editor, Services, BuiltInPlugins, Extensions)

export default Symbols
