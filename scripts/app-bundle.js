var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
            this.whenPaid = new Date();
            this.amountPaid = 237.47;
            this.testDataItem = "TEST DEPENDENCY INJECTION";
            this.data = {
                number1: -532.12,
                number2: 2321.32,
                number3: 321.24,
                number5: 0,
                number6: -Math.PI
            };
            this.dataKeys = Object.keys(this.data);
            this.isDisabled = false;
            this.hasCurrencySymbol = true;
            this.dataName = "number1";
        }
        App.prototype.dataChanged = function () {
            this.dataKeys = Object.keys(this.data);
        };
        return App;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], App.prototype, "data", void 0);
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('au-components/di-experiment',["require", "exports", "aurelia-framework", "../app"], function (require, exports, aurelia_framework_1, app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DiExperiment = (function () {
        function DiExperiment(app) {
            this.app = app;
            this.formattedTestDataItem = "*** " + this.app.testDataItem + " ***";
        }
        return DiExperiment;
    }());
    DiExperiment = __decorate([
        aurelia_framework_1.customElement("au-di-experiment"),
        aurelia_framework_1.inject(app_1.App),
        __metadata("design:paramtypes", [app_1.App])
    ], DiExperiment);
    exports.DiExperiment = DiExperiment;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('au-components/input-currency',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputCurrency = InputCurrency_1 = (function () {
        function InputCurrency() {
            this.error = false;
        }
        InputCurrency.prototype.dataChanged = function () {
            if (this.inputElement === undefined) {
                return;
            }
            this.inputElement.value = this.format(this.data);
            this.validate();
        };
        InputCurrency.prototype.readonlyChanged = function () {
            if (this.inputElement === undefined) {
                return;
            }
            if (this.readonly === true) {
                this.inputElement.setAttribute("readonly", "readonly");
            }
            else {
                this.inputElement.removeAttribute("readonly");
            }
        };
        InputCurrency.prototype.currencySymbolChanged = function () {
            if (this.inputElement === undefined) {
                return;
            }
            this.validate();
        };
        InputCurrency.prototype.attached = function () {
            this.dataChanged();
            this.readonlyChanged();
        };
        InputCurrency.prototype.format = function (number) {
            if (this.currencySymbol === true) {
                return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number);
            }
            else {
                return new Intl.NumberFormat("en-US", { style: "decimal", minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
            }
        };
        InputCurrency.prototype.unformat = function (string) {
            return parseFloat(string.replace(InputCurrency_1.nonNumericRegex, ""));
        };
        InputCurrency.prototype.keydownHandler = function (event) {
            if (event.which === 8 && this.inputElement.selectionStart === this.inputElement.selectionEnd) {
                var cursor = this.inputElement.selectionStart;
                if (this.inputElement.value.charAt(cursor - 1) === "," || this.inputElement.value.charAt(cursor - 1) === ".") {
                    this.inputElement.value = this.inputElement.value.slice(0, cursor - 2) + this.inputElement.value.slice(cursor - 1);
                    this.inputElement.setSelectionRange(cursor - 1, cursor - 1);
                    this.validate();
                    return false;
                }
            }
            if (event.which === 13) {
                this.updateInternal();
            }
            return true;
        };
        InputCurrency.prototype.validate = function () {
            var selectionStart = this.inputElement.selectionStart - (this.inputElement.value.slice(0, this.inputElement.selectionStart).match(InputCurrency_1.nonNumericRegex) || []).length;
            var numericValue = this.unformat(this.inputElement.value);
            if (isNaN(numericValue)) {
                this.error = true;
                this.inputElement.value = "";
            }
            else {
                if (numericValue > 1e12) {
                    numericValue = 1e12;
                }
                if (numericValue < -1e12) {
                    numericValue = -1e12;
                }
                this.externalValue = "";
                this.externalValue = this.format(numericValue);
                this.error = false;
                this.inputElement.value = this.externalValue;
                var selectionStartWithSymbols = 0;
                while (selectionStart > 0) {
                    if (InputCurrency_1.nonNumericRegex.exec(this.externalValue.charAt(selectionStartWithSymbols++)) === null) {
                        selectionStart--;
                    }
                    if (selectionStartWithSymbols >= this.externalValue.length) {
                        break;
                    }
                }
                this.inputElement.setSelectionRange(selectionStartWithSymbols, selectionStartWithSymbols);
            }
        };
        InputCurrency.prototype.updateInternal = function () {
            if (!this.error) {
                this.data = this.unformat(this.externalValue);
            }
            else {
                this.inputElement.value = this.format(this.data);
                this.validate();
            }
        };
        return InputCurrency;
    }());
    InputCurrency.nonNumericRegex = /[^\-0-9\.]/g;
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], InputCurrency.prototype, "data", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], InputCurrency.prototype, "externalValue", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], InputCurrency.prototype, "readonly", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], InputCurrency.prototype, "currencySymbol", void 0);
    InputCurrency = InputCurrency_1 = __decorate([
        aurelia_framework_1.customElement("au-input-currency")
    ], InputCurrency);
    exports.InputCurrency = InputCurrency;
    var InputCurrency_1;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('au-components/input-date',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputDate = (function () {
        function InputDate() {
            this.dateObject = new Date();
            this.dateString = this.dateObject.toJSON().slice(0, 10);
            this.dateStringChanged(this.dateString, null);
        }
        InputDate.prototype.dateStringChanged = function (newValue, oldValue) {
            this.dateObject = new Date(newValue);
            var dateMMDDYYYYOptions = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            };
            var dateDDMMOptions = {
                month: "2-digit",
                day: "2-digit"
            };
            var dateYYYYOptions = {
                year: "numeric"
            };
            this.dateMMDDYYYY = new Intl.DateTimeFormat("en-US", dateMMDDYYYYOptions).format(this.dateObject);
            var dateDDMMParts = new Intl.DateTimeFormat("en-US", dateDDMMOptions).format(this.dateObject);
            this.dateDDMM = dateDDMMParts.slice(3, 5) + " " + dateDDMMParts.slice(0, 2);
            this.dateYYYY = new Intl.DateTimeFormat("en-US", dateYYYYOptions).format(this.dateObject);
        };
        return InputDate;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], InputDate.prototype, "dateString", void 0);
    InputDate = __decorate([
        aurelia_framework_1.customElement("au-input-date"),
        __metadata("design:paramtypes", [])
    ], InputDate);
    exports.InputDate = InputDate;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"./au-components/input-currency\"></require>\n  <require from=\"./au-components/input-date\"></require>\n  <require from=\"./au-components/di-experiment\"></require>\n\n  <!-- au-input-currency test block -->\n  <div>\n    <au-input-currency\n      data.two-way=\"data[dataName]\"\n      readonly.two-way=\"isReadonly\"\n      currency-symbol.two-way=\"hasCurrencySymbol\"\n    ></au-input-currency>\n    Value to choose from: \n    <select value.two-way=\"dataName\">\n      <option repeat.for=\"name of dataKeys\" value=\"${name}\">${data[name]}</option>\n    </select>\n    Readonly? \n    <input type=\"checkbox\" checked.two-way=\"isReadonly\" />\n    Currency Symbol:\n    <input type=\"checkbox\" checked.two-way=\"hasCurrencySymbol\" />\n  </div>\n  <hr />\n\n  <au-input-date></au-input-date>\n\n  <hr />\n\n  <au-di-experiment></au-di-experiment>\n\n</template>\n"; });
define('text!au-components/di-experiment.html', ['module'], function(module) { module.exports = "<template>\n  <p>${formattedTestDataItem}</p>\n</template>\n"; });
define('text!au-components/input-currency.html', ['module'], function(module) { module.exports = "<template>\n\n  <input type=\"text\"\n         ref=\"inputElement\"\n         input.trigger=\"validate()\"\n         keydown.trigger=\"keydownHandler($event)\"\n         value.one-time=\"externalValue\"\n         blur.trigger=\"updateInternal()\"\n         class.one-way=\"error ? 'inputCurrencyError' : ''\" />\n\n  <!-- just for testing -->\n  <p>External value: ${externalValue}; Internal value: ${data}</p>\n  <style>\n    .inputCurrencyError { outline: 1px solid red; }\n  </style>\n  \n</template>\n"; });
define('text!au-components/input-date.html', ['module'], function(module) { module.exports = "<template>\n\n  <input type=\"date\" value.two-way=\"dateString\" />\n  <p>Date MM/DD/YYYY: ${dateMMDDYYYY}</p>\n  <p>Date DD MM: ${dateDDMM}</p>\n  <p>Date YYYY: ${dateYYYY}</p>\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map