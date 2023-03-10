import { Mixin } from 'ts-mixer'

import type { Class } from './type'

/**
 * @description 一个用于多继承的装饰器
 * @use inherit(baseClass1, baseClass2,...more)
 */
export function inherit<T>(...inheritClasses: Class<unknown>[]) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (target: Class<T>): any => {
		const newTarget = inheritClasses.reduce((newClass, curClass) => {
			return Mixin(newClass, curClass)
		}, target) as Class<T>

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return newTarget as any
	}
}
