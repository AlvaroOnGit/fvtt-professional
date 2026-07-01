export {};
declare global {
    /**
     * A simple event framework used throughout Foundry Virtual Tabletop.
     * When key actions or events occur, a "hook" is defined where user-defined callback functions can execute.
     * This class manages the registration and execution of hooked callback functions.
     */
    const Hooks: {
        /**
         * Register a callback handler which should be triggered when a hook is triggered.
         * @param {string} hook     The unique name of the hooked event
         * @param {Function} fn     The callback function which should be triggered when the hook event occurs
         * @param {object} options  Options which customize hook registration
         * @param {boolean} options.once  Only trigger the hooked function once
         * @returns {number}      An ID number of the hooked function which can be used to turn off the hook later
         */
        on(hook: string, fn: Function, options: object): number;
        /**
         * Register a callback handler for an event which is only triggered once the first time the event occurs.
         * An alias for Hooks.on with {once: true}
         * @param {string} hook   The unique name of the hooked event
         * @param {Function} fn   The callback function which should be triggered when the hook event occurs
         * @returns {number}      An ID number of the hooked function which can be used to turn off the hook later
         */
        once(hook: string, fn: Function): number;
        /**
         * Unregister a callback handler for a particular hook event
         * @param {string} hook           The unique name of the hooked event
         * @param {Function|number} fn    The function, or ID number for the function, that should be turned off
         */
        off(hook: string, fn?: Function): void;
    };
}