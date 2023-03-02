import { v4, validate } from 'uuid'

export function createIdentifier() {
	return v4()
}

// =========  test createIdentifier  ======= //
if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest

	test('createIdentifier', () => {
		const id = createIdentifier()

		expect(id).not.toBeUndefined()
		expect(validate(id)).toBe(true)
	})
}
// =========  test createIdentifier  ======= //
