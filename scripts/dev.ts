import * as fs from 'fs'
import path from 'path'

import { execa } from 'execa'
import * as fse from 'fs-extra'

import type { Options as ExecaOptions, ExecaChildProcess } from 'execa'


const web = (): string => path.resolve(__dirname, '../packages', 'jeditor-web')
const app = (): string => path.resolve(__dirname, '../packages', 'jeditor-app')

const isDirectory = (path: string): boolean => fs.statSync(path).isDirectory()
const pathExist = (path: string): boolean => fse.pathExistsSync(path)
const run = (
	bin: string,
	args: string[],
	opts: ExecaOptions<string> = {}
): ExecaChildProcess<string> => {
	return execa(bin, args, { stdio: 'inherit', ...opts })
}

const clearOldDist = async (src: string): Promise<void> => {
	src = path.resolve(src, 'dist')

	if (pathExist(src) && isDirectory(src)) {
		fse.removeSync(src)
	}
}

// 将dist从web搬运到app
const moveDistTo = async (src: string, des: string): Promise<void> => {
	src = path.resolve(src, 'dist')
	des = path.resolve(des, 'dist')

	if (!pathExist(src)) throw new Error(`${src} does not exsit!`)

	if (!isDirectory(src)) throw new Error(`${src} is not directory!`)

	fse.moveSync(src, des)
}

async function main(): Promise<void> {
	clearOldDist(web())
	clearOldDist(app())
	await run('pnpm', ['-r', '--filter', '@jeditor/web', 'run', 'build'])
	moveDistTo(web(), app())
	await run('pnpm', ['-r', '--filter', '@jeditor/app', 'run', 'dev'])
}

main()
