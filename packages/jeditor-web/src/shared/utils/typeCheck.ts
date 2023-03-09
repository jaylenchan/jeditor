export function isArray(val: unknown): boolean {
	return {}.toString.call(val) === '[object Array]'
}

export function isFunction(val: unknown): boolean {
	return typeof val === 'function'
}
