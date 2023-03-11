import { ref, reactive, toRaw } from 'vue'

import { injectable } from 'shared/utils/dependencyInject'

import type { Ref, UnwrapRef, UnwrapNestedRefs } from 'vue'

export type ReactiveObject<T> = UnwrapNestedRefs<T>

@injectable()
class ReactivityService {

	public toRef<T>(obj: T): Ref<UnwrapRef<T>> {
		return ref(obj)
	}

	public toReactive<T extends object>(obj: T): ReactiveObject<T> {
		return reactive(obj)
	}

	public toRaw<T extends ReactiveObject<unknown>>(obj: T): T {
		return toRaw(obj)
	}

}

export default ReactivityService
