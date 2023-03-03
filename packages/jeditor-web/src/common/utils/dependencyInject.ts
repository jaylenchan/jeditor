import { injectable, inject, decorate, Container } from 'inversify'
import { Mixin } from 'ts-mixer'

import { Class } from './type'

/**
 * @description 一个实现多继承的injectable装饰器
 * @use injectableInherit(baseClass1, baseClass2,...more)
 */
export function injectableInherit<T>(...inheritClasses: Class<unknown>[]) {
	return (target: Class<T>) => {
		const newTarget = inheritClasses.reduce((newClass, curClass) => {
			return Mixin(newClass, curClass)
		}, target) as Class<T>

		decorate(injectable(), newTarget)

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return newTarget as any
	}
}

export { injectable, inject, Container }
