import lodash from 'lodash'

type Spread<T> = T extends Array<infer P>
	? {
			[K in keyof P]: P[K]
	  }
	: never

type UnionToIntersection<U> = (
	U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
	? R
	: never

export function merge<T, K extends Array<unknown>>(
	srcObject: T,
	...dstObjects: K
) {
	return lodash.merge(srcObject, ...dstObjects) as T &
		UnionToIntersection<Spread<K>>
}
