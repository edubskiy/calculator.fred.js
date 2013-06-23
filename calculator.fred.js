/**
 * Precision Calculator for JavaScript
 * named Fred :)
 *
 * @author Evgeniy Dubskiy
 * @example
 * var expression = FredCalc().sum(1,2).sum(1).multiply(2)
 * expression.getResult() // 8
 */
(function(exports, undefined) {
    /**
     * Dummy constructor
     *
     * @param options
     * @returns {FredCalc}
     * @constructor
     */
    function FredCalc(options) {
        if ( !(this instanceof FredCalc)) {
            return new FredCalc(options);
        }
        this.defaultOptions = { precision: 100 };
        this.options = this._extend(this.defaultOptions, (options || {}));
    }

    /**
     * Extends properties of the first object
     * with properties of the second object
     *
     * @param {object} obj1
     * @param {object} obj2
     * @returns {object}
     */
    FredCalc.prototype._extend = function(obj1, obj2) {
        for( var name in obj2 ) {
            if (obj2.hasOwnProperty(name)) {
                obj1[name] = obj2[name];
            }
        }
        return obj1;
    };

    FredCalc.prototype._isNumber = function(item) {
        return !isNaN(item);
    };

    /**
     * Get Number with defined precision
     *
     * @param number
     * @returns {int}
     */
    FredCalc.prototype._getNumberWithPrecision = function(number) {
        if ( this._isNumber(number) ) {
            return parseInt(number * this.options.precision, 10);
        }
        return 0;
    };

    FredCalc.prototype._resNumber = 0;

    /**
     * Get the Result Number with restored precision
     *
     * @returns {number}
     */
    FredCalc.prototype._setPrecision = function() {
        this._resNumber = this._getNumberWithPrecision( this._resNumber ) / this.options.precision;
        return this;
    };

    FredCalc.prototype.getResult = function() {
        this._setPrecision();
        return this._resNumber;
    };

    FredCalc.prototype.clear = function() {
        this._resNumber = 0;
        return this;
    };

    FredCalc.prototype.sum = function() {
        for ( var i = 0, numbersCount = arguments.length; i < numbersCount; i++ ) {
            this._resNumber += arguments[i];
        }
        return this;
    };

    FredCalc.prototype.multiply = function() {
        for ( var i = 0, numbersCount = arguments.length; i < numbersCount; i++ ) {
            this._resNumber *= arguments[i];
        }
        return this;
    };

    FredCalc.prototype.sub = function() {
        for ( var i = 0, numbersCount = arguments.length; i < numbersCount; i++ ) {
            this._resNumber -= arguments[i];
        }
        return this;
    };

    FredCalc.prototype.divide = function() {
        var thisNumber = 0;
        for ( var i = 0, numbersCount = arguments.length; i < numbersCount; i++ ) {
            thisNumber = arguments[i];
            // first iteration?
            if (this._resNumber) {
                // check possible division by zero
                if (thisNumber) {
                    this._resNumber /= thisNumber;
                } else {
                    throw 'Error: Division by zero for parameter #' + i;
                }
            } else {
                this._resNumber = thisNumber;
            }
        }
        return this;
    };

    exports.FredCalc = FredCalc;

}(this));