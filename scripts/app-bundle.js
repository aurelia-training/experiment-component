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
define('au-components/input-currency',["require", "exports", "aurelia-framework", "../app"], function (require, exports, aurelia_framework_1, app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputCurrency = InputCurrency_1 = (function () {
        function InputCurrency(app) {
            this.app = app;
            this.error = false;
        }
        InputCurrency.prototype.dataNameChanged = function () {
            if (this.inputElement === undefined) {
                return;
            }
            this.inputElement.value = this.format(this.app.data[this.dataName]);
            this.validate();
        };
        InputCurrency.prototype.disabledChanged = function () {
            if (this.inputElement === undefined) {
                return;
            }
            if (this.disabled === true) {
                this.inputElement.setAttribute("disabled", "disabled");
            }
            else {
                this.inputElement.removeAttribute("disabled");
            }
        };
        InputCurrency.prototype.attached = function () {
            this.dataNameChanged();
            this.disabledChanged();
        };
        InputCurrency.prototype.format = function (number) {
            return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number);
        };
        InputCurrency.prototype.unformat = function (string) {
            return parseFloat(string.replace(InputCurrency_1.nonNumericRegex, ""));
        };
        InputCurrency.prototype.validate = function () {
            var selectionStart = this.inputElement.selectionStart - (this.inputElement.value.slice(0, this.inputElement.selectionStart).match(InputCurrency_1.nonNumericRegex) || []).length;
            var numericValue = this.unformat(this.inputElement.value);
            if (isNaN(numericValue)) {
                this.error = true;
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
                this.app.data[this.dataName] = this.unformat(this.externalValue);
            }
            else {
                this.inputElement.value = this.format(this.app.data[this.dataName]);
                this.validate();
            }
        };
        return InputCurrency;
    }());
    InputCurrency.nonNumericRegex = /[^\-0-9\.]/g;
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], InputCurrency.prototype, "dataName", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], InputCurrency.prototype, "externalValue", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], InputCurrency.prototype, "disabled", void 0);
    InputCurrency = InputCurrency_1 = __decorate([
        aurelia_framework_1.customElement("au-input-currency"),
        aurelia_framework_1.inject(app_1.App),
        __metadata("design:paramtypes", [app_1.App])
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

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('au-converters/ToFromValidate',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToFromValidate = (function () {
        function ToFromValidate() {
        }
        return ToFromValidate;
    }());
    ToFromValidate = __decorate([
        aurelia_framework_1.valueConverter("toFromValidate")
    ], ToFromValidate);
    exports.ToFromValidate = ToFromValidate;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"./au-components/input-currency\"></require>\n  <require from=\"./au-components/input-date\"></require>\n  <require from=\"./au-components/di-experiment\"></require>\n\n  <!-- au-input-currency test block -->\n  <div>\n    <au-input-currency data-name.two-way=\"dataName\" disabled.two-way=\"isDisabled\"></au-input-currency>\n    Value to choose from: \n    <select value.two-way=\"dataName\">\n      <option repeat.for=\"name of dataKeys\" value=\"${name}\">${data[name]}</option>\n    </select>\n    Disabled? \n    <input type=\"checkbox\" checked.two-way=\"isDisabled\" />\n  </div>\n  <hr />\n\n  <au-input-date></au-input-date>\n\n  <hr />\n\n  <au-di-experiment></au-di-experiment>\n\n</template>\n"; });
define('text!au-components/di-experiment.html', ['module'], function(module) { module.exports = "<template>\n  <p>${formattedTestDataItem}</p>\n</template>\n"; });
define('text!au-components/input-currency.html', ['module'], function(module) { module.exports = "<template>\n\n  <input type=\"text\"\n         ref=\"inputElement\"\n         input.trigger=\"validate()\"\n         value.one-time=\"externalValue\"\n         blur.trigger=\"updateInternal()\"\n         class.one-way=\"error ? 'inputCurrencyError' : ''\" />\n\n  <!-- just for testing -->\n  <p>Internal value: ${externalValue}; Internal value: ${app.data[dataName]}</p>\n  <style>\n    .inputCurrencyError { outline: 2px solid red; }\n  </style>\n  \n</template>\n"; });
define('text!au-components/input-date.html', ['module'], function(module) { module.exports = "<template>\n\n  <input type=\"date\" value.two-way=\"dateString\" />\n  <p>Date MM/DD/YYYY: ${dateMMDDYYYY}</p>\n  <p>Date DD MM: ${dateDDMM}</p>\n  <p>Date YYYY: ${dateYYYY}</p>\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map