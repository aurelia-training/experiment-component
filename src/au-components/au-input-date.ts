import {bindable} from "aurelia-framework";

export class AuInputDate {

  dateObject:Date = new Date();
  @bindable dateString:string = this.dateObject.toJSON().slice(0, 10);
  dateMMDDYYYY:string;
  dateDDMM:string;
  dateYYYY:string;

  dateStringChanged(newValue, oldValue) {
    this.dateObject = new Date(newValue);
    let date = ("0" + this.dateObject.getDate()).slice(-2);
    let month = ("0" + (this.dateObject.getMonth() + 1)).slice(-2); // month is zero-indexed
    let year = this.dateObject.getFullYear();

    this.dateMMDDYYYY = month + "/" + date + "/" + year;
    this.dateDDMM = date + " " + month;
    this.dateYYYY = "" + year;
  }

  constructor() {
    this.dateStringChanged(this.dateString, null);
  }

}
