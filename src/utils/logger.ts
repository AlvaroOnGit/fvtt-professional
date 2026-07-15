import CONSTANTS from '../constants';

type LogLevel = "log" | "groupCollapsed";

const MODULE_NAME = CONSTANTS.MODULE_ID.toUpperCase()

/**
 * Logger utility for module-specific console output.
 *
 * Wraps the native `console` methods with a styled prefix. Regular logs
 * are gated behind the `debugMode` client setting; `info` always prints, regardless of debug mode.
 *
 * @example
 * ```ts
 * Logger.info('Module Initialized', moduleVersion);
 * Logger.log('Actor updated:', actor);
 * ```
 */
export default class Logger {
    static logStyles = 'color: #4ade80'
    /**
     * Checks whether debug mode is currently enabled in the module settings.
     *
     * @returns `true` if the `debugMode` client setting is enabled, `false` otherwise.
     */
    static isDebug(): boolean {
        return game.settings.get(CONSTANTS.MODULE_ID, 'debugMode') as boolean;
    }
    /**
     * Logs a message to the console, prefixed with the module name.
     * Only logs if `debugMode` client setting is enabled.
     *
     * @param message - Message to display.
     * @param level - Console logging method to call.
     * @param args - Additional values to log.
     */
    static log(message: string, level: LogLevel = 'log', ...args: unknown[]) {
        if (this.isDebug()) {
            console[level](`%c${MODULE_NAME}`, this.logStyles, '|', message, ...args);
        }
    }
    /**
     * Logs a message to the console, prefixed with the module name.
     *
     * @param message - Message to display.
     * @param level - Console logging method to call.
     * @param args - Additional values to log.
     */
    static info(message: string, level: LogLevel = 'log', ...args: unknown[]){
        console[level](`%c${MODULE_NAME}`, this.logStyles, '|', message, ...args);
    }
}