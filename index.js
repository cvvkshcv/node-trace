Object.defineProperty(global, '__stack', {
	get: function() {
		const orig = Error.prepareStackTrace;
		Error.prepareStackTrace = function(_, stack) {
			return stack;
		};
		const err = new Error;
		Error.captureStackTrace(err, arguments.callee);
		const stack = err.stack;
		Error.prepareStackTrace = orig;
		return stack;
	}
});
const methods = ['info', 'log', 'warn', 'error', 'dir'];
methods.forEach(method => {
    let temp = console[method];
    console[method] = function() {
        temp('\x1b[36m%s\x1b[0m', `Function = ${__stack[1].getFunctionName()}:${__stack[1].getLineNumber()} `);
        temp.apply(console, arguments);
    };
});
