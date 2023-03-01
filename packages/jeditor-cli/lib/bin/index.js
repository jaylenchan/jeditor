#! /usr/bin/env node
'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const cli_1 = __importDefault(require('../cli'))
const commands_1 = __importDefault(require('../commands'))
const cli = new cli_1.default()
cli.run(commands_1.default)
