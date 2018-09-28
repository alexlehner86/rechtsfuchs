class ErrorMessages {
    constructor() {
        this.messages = [];
    }

    addMessage(message) {
        this.messages.push(message);
    }

    isEmpty() {
        return this.messages.length === 0;
    }

    getErrorStringWithSeparator(separator) {
        if (this.isEmpty()) {
            return '';
        } else {
            let errorString = '';
            this.messages.forEach(message => {
                errorString += ' ' + separator + ' ' + message;
            });
            return errorString.slice(separator.length+1, errorString.length);
        }
    }
}

export { ErrorMessages };