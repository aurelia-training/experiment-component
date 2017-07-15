import {bindable} from "aurelia-framework";

export class App {
  whenPaid:Date = new Date();
  amountPaid:number = 237.47;

  testDataItem:string = "TEST DEPENDENCY INJECTION";

  @bindable data = {
    number1: -532.12,
    number2: 2321.32,
    number3: 321.24,
    number5: 0,
    number6: -Math.PI;
  };
  dataKeys = Object.keys(this.data);
  dataChanged() {
    this.dataKeys = Object.keys(this.data);
  }
  isDisabled = false;
  hasCurrencySymbol = true;
  dataName = "number1";

}
