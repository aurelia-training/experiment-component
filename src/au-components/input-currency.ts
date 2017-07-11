import {inject, bindable, customElement} from "aurelia-framework";
import {App} from "../app";

@customElement("au-input-currency")
@inject(App)
export class InputCurrency {
  
  // name of numerical value in App's data variable
  @bindable
  public dataName:string;

  // value to be displayed (formatted string)
  @bindable
  private externalValue:string;

  // if the number is non-numerical
  private error:boolean = false;

  // input element reference
  private inputElement:HTMLInputElement;

  // regex to test for non-numerical characters (anything that is not a digit, a period, or a negative sign)
  private static nonNumericRegex:RegExp = /[^\-0-9\.]/g;

  // disabled check
  @bindable
  public disabled:string = "false";

  // inject App, setup link
  constructor(private app:App) {}

  // setup dataName and disabled
  dataNameChanged() {
    if(this.inputElement === undefined) {
      return;
    }
    this.inputElement.value = this.format(this.app.data[this.dataName]);
    this.validate();
  }
  disabledChanged() {
    if(this.inputElement === undefined) {
      return;
    }
    if(this.disabled === "true") {
      this.inputElement.setAttribute("disabled", "disabled");
    } else {
      this.inputElement.removeAttribute("disabled");
    }
  }
  attached() {
    this.dataNameChanged();
    this.disabledChanged();
  }

  // method to format number to formatted string
  format(number:number) {
    return new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(number);
  }

  // method to return numerical value of formatted string
  unformat(string:string) {
    return parseFloat(string.replace(InputCurrency.nonNumericRegex, ""));
  }

  // method to validate input; effectively a value converter
  validate() {

    // get selection start before (counts number of numerical numbers before)
    let selectionStart = this.inputElement.selectionStart - (this.inputElement.value.slice(0, this.inputElement.selectionStart).match(InputCurrency.nonNumericRegex) || []).length;

    // strip of extra formatting with some regex (sorry!)
    let numericValue = this.unformat(this.inputElement.value);

    // if errorenous (if only non-numerical/no input)
    if(isNaN(numericValue)) {
      this.error = true;
    } else {

      // set maximum magnitude to 1 trillion / negative 1 trillion (avoid loss of precision)
      if(numericValue > 1e12) {
        numericValue = 1e12;
      }
      if(numericValue < -1e12) {
        numericValue = -1e12;
      }

      // manually refresh this.externalValue to get one-way binding to refresh; probably not the best way
      this.externalValue = "";

      // set externalValue
      this.externalValue = this.format(numericValue);
      this.error = false;

      // mimic binding (necessary for cursor reset to work properly)
      this.inputElement.value = this.externalValue; 

      // set cursor back accurately
      let selectionStartWithSymbols = 0;
      while(selectionStart > 0) {
        if(InputCurrency.nonNumericRegex.exec(this.externalValue.charAt(selectionStartWithSymbols++)) === null) {
          selectionStart--;
        }
        if(selectionStartWithSymbols >= this.externalValue.length) {
          break;
        }
      }
      this.inputElement.setSelectionRange(selectionStartWithSymbols, selectionStartWithSymbols);
    }
  }

  // method to update internal variable on blur event
  updateInternal() {

    // if no error then set internal value to external value
    if(!this.error) {
      this.app.data[this.dataName] = this.unformat(this.externalValue);

    // if error then set external value to internal value
    } else {
      this.inputElement.value = this.format(this.app.data[this.dataName]);
      this.validate();
    }
  }

}
