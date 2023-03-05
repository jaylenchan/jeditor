/** 所有class通用的类型就是Class<T> */
export interface Class<T> extends Function {
	new (...args: unknown[]): T
}
