import {valueConverter} from "aurelia-framework";

@valueConverter("toFromValidate")
export class ToFromValidate {

  /*fromView(input:string) {
    // strip number of extra formatting with some regex
    input = input.replace(/[^0-9\.]/g, "");

    return parseFloat(input);
  }

  toView(input:number) {
    console.log(new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(input));
    return new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(input);
  }*/
  
}
