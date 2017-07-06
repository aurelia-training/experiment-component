import {bindable, customElement} from "aurelia-framework";

@customElement("au-input-currency")
export class InputCurrency {
  
  @bindable unformattedValue = 3426.1179;
  formattedValue:string;

  unformattedValueChanged(newValue, oldValue) {
    this.formattedValue = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(newValue.toString());
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
