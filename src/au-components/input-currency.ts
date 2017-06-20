import {bindable, customElement} from "aurelia-framework";

@customElement("au-input-currency")
export class InputCurrency {
  
  @bindable unformattedValue = 3426.1179;
  formattedValue:string;

  unformattedValueChanged(newValue, oldValue) {
    let match = /(\d+)(\.\d+)?/.exec(newValue.toString());
    if(match === null) {
      this.formattedValue = "Invalid number";
      return;
    }

    // round after two decimal places
    let afterDecimal = parseFloat(match[2] || "0").toFixed(2);

    // add commas at spacing 3
    let beforeDecimal = match[1];
    for(let i = beforeDecimal.length-3; i > 0; i -= 3) {
      beforeDecimal = beforeDecimal.slice(0, i) + "," + beforeDecimal.slice(i);
    }

    // concatenate everything back together again
    this.formattedValue = "$" + beforeDecimal + afterDecimal.toString().slice(1);
  }

  updateUnformattedValue() {
    let unformattedNumber = this.formattedValue.replace(/[\,\$]/g, "");
    if(/^\d+(\.\d+)?$/.exec(unformattedNumber) !== null) {
      this.unformattedValue = parseFloat(unformattedNumber);
    } else {
      this.unformattedValueChanged(this.unformattedValue, null);
    }
  }

  constructor() {
    this.unformattedValueChanged(this.unformattedValue, null);
  }
  
}
