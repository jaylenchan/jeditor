export function isArray(val: unknown): boolean {
	return {}.toString.call(val) === '[object Array]'
}
