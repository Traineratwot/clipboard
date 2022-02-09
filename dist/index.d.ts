export declare class WebClipboard {
    mode: 'navigator' | 'fallback' | 'notSupport';
    constructor(mode?: 'navigator' | 'fallback' | 'notSupport' | undefined);
    private __fallback_write;
    private __fallback_read;
    private __navigator_write;
    private __navigator_read;
    private __notSupport_write;
    private __notSupport_read;
    /**
     * write clipboad
     *
     */
    write(data?: string): Promise<boolean | void>;
    /**
     * read clipboad
     *
     */
    read(): Promise<string | void>;
    /**
     * install as Vue plugin
     */
    install(app: any): void;
}
declare const _default: WebClipboard;
export default _default;
