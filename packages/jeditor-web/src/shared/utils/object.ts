import lodash from 'lodash'

export function merge(srcObject: unknown, ...dstObjects: unknown[]) {
	return lodash.merge(srcObject, ...dstObjects)
}
