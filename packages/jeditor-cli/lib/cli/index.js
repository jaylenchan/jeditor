"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
class JEditorCli extends commander_1.Command {
    constructor() {
        super();
    }
    useCommands(commands) {
        commands.forEach(cmd => {
            cmd(this);
        });
    }
    run(commands) {
        this.useCommands(commands);
        this.parse();
    }
}
exports.default = JEditorCli;
