/**
 * A simple class desgined to hold the LogLevel's used by {Logger}.
 * 
 * @export
 * @class LogLevel
 */
export class LogLevel {

    /**
     * Creates an instance of LogLevel.
     * 
     * @param {string} level_name The Level name which this LogLevel should hold.
     * 
     * @memberOf LogLevel
     */
    constructor(public level_name: string) {}

    /**
     * Retrieves the set log level.
     * 
     * @returns {string} The LogLevel provided at instantiation.
     * 
     * @memberOf LogLevel
     */
    get(): string {
        return this.level_name
    }

}