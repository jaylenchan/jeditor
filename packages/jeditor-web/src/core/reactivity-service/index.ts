import { ref, reactive, toRaw } from 'vue'

import { injectable } from 'shared/utils/dependencyInject'

import type { Ref, UnwrapRef, UnwrapNestedRefs } from 'vue'

@injectable()
class ReactivityService {

	public toRef<T>(obj: T): Ref<UnwrapRef<T>> {
		return ref(obj)
	}

	public toReactive<T extends Record<string | number | symbol, unknown>>(
		obj: T
	): UnwrapNestedRefs<T> {
		return reactive(obj)
	}

	public toRaw<T extends UnwrapNestedRefs<unknown>>(obj: T): T {
		return toRaw(obj)
	}

}

export default ReactivityService
