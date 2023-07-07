class HttpException extends Error {
	constructor(status, message) {
		super(message)
		this.status = status
		this.message = status === 500 ? 'An error occurred handling this request' : message
	}
}

module.exports = HttpException
