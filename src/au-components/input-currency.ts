import {bindable, customElement} from "aurelia-framework";

@customElement("au-input-currency")
export class InputCurrency {
  
  // internal numerical data
  @bindable
  public data:number;

  // value to be displayed (formatted string)
  @bindable
  private externalValue:string;

  // if the number is non-numerical
  private error:boolean = false;

  // input element reference
  private inputElement:HTMLInputElement;

  // regex to test for non-numerical characters (anything that is not a digit, a period, or a negative sign)
  private static nonNumericRegex:RegExp = /[^\-0-9\.]/g;

  // readonly check
  @bindable
  public readonly:boolean;

  // has currency symbol or not
  @bindable
  public currencySymbol:boolean;

  // setup data and readonly
  dataChanged() {
    if(this.inputElement === undefined) {
      return;
    }
    this.inputElement.value = this.format(this.data);
    this.validate();
  }
  readonlyChanged() {
    if(this.inputElement === undefined) {
      return;
    }
    if(this.readonly === true) {
      this.inputElement.setAttribute("readonly", "readonly");
    } else {
      this.inputElement.removeAttribute("readonly");
    }
  }
  currencySymbolChanged() {
    if(this.inputElement === undefined) {
      return;
    }
    this.validate();
  }
  attached() {
    this.dataChanged();
    this.readonlyChanged();
  }

  // method to format number to formatted string
  format(number:number) {
    if(this.currencySymbol === true) {
      return new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(number);
    } else {
      return new Intl.NumberFormat("en-US", {style: "decimal", minimumIntegerDigits: 1, minimumFractionDigits: 2, maximumFractionDigits: 2}).format(number);
    }
  }

  // method to return numerical value of formatted string
  unformat(string:string) {
    return parseFloat(string.replace(InputCurrency.nonNumericRegex, ""));
  }

  // event handler for special keys (backspace before comma/period and enter
  keydownHandler(event) {
    // special functionality on right of comma or period
    if(event.which === 8 && this.inputElement.selectionStart === this.inputElement.selectionEnd) {
      let cursor = this.inputElement.selectionStart;
      if(this.inputElement.value.charAt(cursor-1) === "," || this.inputElement.value.charAt(cursor-1) === ".") {
        let setCursor = (this.inputElement.value.charAt(cursor-1) === ",") ? cursor-1 : cursor-2;
        this.inputElement.value = this.inputElement.value.slice(0, cursor-2) + this.inputElement.value.slice(cursor-1);
        this.inputElement.setSelectionRange(setCursor, setCursor);
        this.validate();
        return false;
      }
    }
    // if <Enter> is pressed update internal
    if(event.which === 13) {
      this.updateInternal();
    }
    return true;
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
      this.inputElement.value = "";
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
      this.data = this.unformat(this.externalValue);

    // if error then set external value to internal value
    } else {
      this.inputElement.value = this.format(this.data);
      this.validate();
    }
  }

}
