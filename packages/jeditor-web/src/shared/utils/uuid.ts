import { v4, validate } from 'uuid'


export function createIdentifier(): string {
	return v4()
}

// =========  test createIdentifier  ======= //
if (import.meta.vitest) {
	it('should create a id', () => {
		const id = createIdentifier()

		expect(id).not.toBeUndefined()
		expect(validate(id)).toBe(true)
	})
}
// =========  test createIdentifier  ======= //

export { validate }
