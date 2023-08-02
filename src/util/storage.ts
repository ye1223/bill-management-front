//@ts-nocheck
export function getItem(key) {
	return window.sessionStorage.getItem(key)
}

export function setItem(key, value) {
	if (typeof value === 'object') {
		window.sessionStorage.setItem(key, JSON.stringify(value))
	} else {
		window.sessionStorage.setItem(key, value)
	}
}

/**
 * 注销退出时调用
 */
export function clearStorage() {
	window.sessionStorage.clear()
}
