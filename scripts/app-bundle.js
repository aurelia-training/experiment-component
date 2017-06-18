define('app',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
        }
        return App;
    }());
    exports.App = App;
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
define('date-formatter',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DateFormatter = (function () {
        function DateFormatter() {
            this.dateObject = new Date();
            this.dateString = this.dateObject.toJSON().slice(0, 10);
            this.dateStringChanged(this.dateString, null);
        }
        DateFormatter.prototype.dateStringChanged = function (newValue, oldValue) {
            this.dateObject = new Date(newValue);
            var date = ("0" + this.dateObject.getDate()).slice(-2);
            var month = ("0" + (this.dateObject.getMonth() + 1)).slice(-2);
            var year = this.dateObject.getFullYear();
            this.dateMMDDYYYY = month + "/" + date + "/" + year;
            this.dateDDMM = date + " " + month;
            this.dateYYYY = "" + year;
        };
        return DateFormatter;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], DateFormatter.prototype, "dateString", void 0);
    exports.DateFormatter = DateFormatter;
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
define('money-formatter',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MoneyFormatter = (function () {
        function MoneyFormatter() {
            this.unformattedValue = "3426.1179";
            this.unformattedValueChanged(this.unformattedValue, null);
        }
        MoneyFormatter.prototype.unformattedValueChanged = function (newValue, oldValue) {
            var match = /(\d+)(\.\d+)?/.exec(newValue);
            if (match == null) {
                this.formattedValue = "Invalid number";
                return;
            }
            var afterDecimal = parseFloat(match[2] || "0").toFixed(2);
            var beforeDecimal = match[1];
            for (var i = beforeDecimal.length - 3; i > 0; i -= 3) {
                beforeDecimal = beforeDecimal.slice(0, i) + "," + beforeDecimal.slice(i);
            }
            this.formattedValue = "$" + beforeDecimal + afterDecimal.toString().slice(1);
        };
        return MoneyFormatter;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], MoneyFormatter.prototype, "unformattedValue", void 0);
    exports.MoneyFormatter = MoneyFormatter;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n  <require from=\"./money-formatter\"></require>\n  <require from=\"./date-formatter\"></require>\n\n  <money-formatter></money-formatter>\n  <date-formatter></date-formatter>\n\n</template>\n"; });
define('text!date-formatter.html', ['module'], function(module) { module.exports = "<template>\n\n  <input type=\"date\" value.bind=\"dateString\" />\n  <p>Date MM/DD/YYYY: ${dateMMDDYYYY}</p>\n  <p>Date DD MM: ${dateDDMM}</p>\n  <p>Date YYYY: ${dateYYYY}</p>\n\n</template>\n"; });
define('text!money-formatter.html', ['module'], function(module) { module.exports = "<template>\n  \n  <input type=\"number\" value.bind=\"unformattedValue\" step=\"any\" />\n  <p>${unformattedValue} &rarr; ${formattedValue}</p>\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map