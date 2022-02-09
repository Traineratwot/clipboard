export class WebClipboard {
	mode: 'navigator' | 'fallback' | 'notSupport';
	constructor(mode: 'navigator' | 'fallback' | 'notSupport' | undefined = undefined) {
		if (mode) {
			this.mode = mode
		} else {
			if (navigator?.clipboard) {
				this.mode = 'navigator'
			} else if (typeof document.queryCommandSupported === 'function' && typeof document.execCommand === 'function') {
				this.mode = 'fallback'
			} else {
				this.mode = 'notSupport'
			}
		}
	}

	private async __fallback_write(data = '') {
		const textArea = document.createElement('textarea')
		textArea.value = data
		document.body.appendChild(textArea)
		textArea.focus()
		textArea.select()
		try {
			const successful = document.execCommand('copy')
			if (successful) {
				document.body.removeChild(textArea)
				return true
			} else {
				throw 'This browser does not support write from clipboard'
			}
		} catch (e) {
			document.body.removeChild(textArea)
			throw e
		}
	}

	private async __fallback_read() {
		const textArea = document.createElement('textarea')
		// Avoid scrolling to bottom
		document.body.appendChild(textArea)
		textArea.focus()
		textArea.select()
		try {
			const successful = document.execCommand('paste')
			if (successful) {
				document.body.removeChild(textArea)
				return textArea.value
			} else {
				throw 'This browser does not support read from clipboard'
			}
		} catch (e) {
			document.body.removeChild(textArea)
			throw e
		}
	}


	private async __navigator_write(data = '') {
		document.body.focus()
		try {
			if (typeof navigator?.clipboard?.writeText == 'function') {
				await navigator.clipboard.writeText(data)
			} else {
				throw 0
			}
		} catch (e) {
			throw 'This browser does not support write from clipboard'
		}
	}


	private async __navigator_read() {
		document.body.focus()
		try {
			if (typeof navigator?.clipboard?.readText == 'function') {
				const x = await navigator.clipboard.readText() || ''
				return x
			} else {
				throw 0
			}
		} catch (e) {
			throw 'This browser does not support read from clipboard'
		}
	}


	private __notSupport_write() {
		throw 'This browser does not support write from clipboard'
	}


	private __notSupport_read() {
		throw 'This browser does not support read from clipboard'
	}

	/**
	 * write clipboad
	 * 
	 */
	public async write(data = '') {
		if (!data) {
			throw 'data is empty'
		}
		switch (this.mode) {
			case 'navigator':
				return this.__navigator_write(data)
			case 'fallback':
				return this.__fallback_write(data)
			case 'notSupport':
				return this.__notSupport_write()
		}
	}
	/**
	 * read clipboad
	 * 
	 */
	public async read() {
		switch (this.mode) {
			case 'navigator':
				return this.__navigator_read()
			case 'fallback':
				return this.__fallback_read()
			case 'notSupport':
				return this.__notSupport_read()
		}
	}
	/**
	 * install as Vue plugin
	 */
	public install(app: any) {
		if (app?.config?.globalProperties) {
			app.config.globalProperties.$clipboard = this
		}
	}
}

export default new WebClipboard()