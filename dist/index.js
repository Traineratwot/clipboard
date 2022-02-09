var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class WebClipboard {
    constructor(mode = undefined) {
        if (mode) {
            this.mode = mode;
        }
        else {
            if (navigator === null || navigator === void 0 ? void 0 : navigator.clipboard) {
                this.mode = 'navigator';
            }
            else if (typeof document.queryCommandSupported === 'function' && typeof document.execCommand === 'function') {
                this.mode = 'fallback';
            }
            else {
                this.mode = 'notSupport';
            }
        }
    }
    __fallback_write(data = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const textArea = document.createElement('textarea');
            textArea.value = data;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    document.body.removeChild(textArea);
                    return true;
                }
                else {
                    throw 'This browser does not support write from clipboard';
                }
            }
            catch (e) {
                document.body.removeChild(textArea);
                throw e;
            }
        });
    }
    __fallback_read() {
        return __awaiter(this, void 0, void 0, function* () {
            const textArea = document.createElement('textarea');
            // Avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                const successful = document.execCommand('paste');
                if (successful) {
                    document.body.removeChild(textArea);
                    return textArea.value;
                }
                else {
                    throw 'This browser does not support read from clipboard';
                }
            }
            catch (e) {
                document.body.removeChild(textArea);
                throw e;
            }
        });
    }
    __navigator_write(data = '') {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            document.body.focus();
            try {
                if (typeof ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText) == 'function') {
                    yield navigator.clipboard.writeText(data);
                }
                else {
                    throw 0;
                }
            }
            catch (e) {
                throw 'This browser does not support write from clipboard';
            }
        });
    }
    __navigator_read() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            document.body.focus();
            try {
                if (typeof ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.clipboard) === null || _a === void 0 ? void 0 : _a.readText) == 'function') {
                    const x = (yield navigator.clipboard.readText()) || '';
                    return x;
                }
                else {
                    throw 0;
                }
            }
            catch (e) {
                throw 'This browser does not support read from clipboard';
            }
        });
    }
    __notSupport_write() {
        throw 'This browser does not support write from clipboard';
    }
    __notSupport_read() {
        throw 'This browser does not support read from clipboard';
    }
    /**
     * write clipboad
     *
     */
    write(data = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data) {
                throw 'data is empty';
            }
            switch (this.mode) {
                case 'navigator':
                    return this.__navigator_write(data);
                case 'fallback':
                    return this.__fallback_write(data);
                case 'notSupport':
                    return this.__notSupport_write();
            }
        });
    }
    /**
     * read clipboad
     *
     */
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.mode) {
                case 'navigator':
                    return this.__navigator_read();
                case 'fallback':
                    return this.__fallback_read();
                case 'notSupport':
                    return this.__notSupport_read();
            }
        });
    }
    /**
     * install as Vue plugin
     */
    install(app) {
        var _a;
        if ((_a = app === null || app === void 0 ? void 0 : app.config) === null || _a === void 0 ? void 0 : _a.globalProperties) {
            app.config.globalProperties.$clipboard = this;
        }
    }
}
export default new WebClipboard();
//# sourceMappingURL=index.js.map