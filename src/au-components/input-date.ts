import {bindable, customElement} from "aurelia-framework";

@customElement("au-input-date")
export class InputDate {

  dateObject:Date = new Date();
  @bindable dateString:string = this.dateObject.toJSON().slice(0, 10);
  dateMMDDYYYY:string;
  dateDDMM:string;
  dateYYYY:string;

  dateStringChanged(newValue, oldValue) {
    this.dateObject = new Date(newValue);

    let dateMMDDYYYYOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    };
    let dateDDMMOptions = {
      month: "2-digit",
      day: "2-digit"
    };
    let dateYYYYOptions = {
      year: "numeric"
    };

    this.dateMMDDYYYY = new Intl.DateTimeFormat("en-US", dateMMDDYYYYOptions).format(this.dateObject);
    let dateDDMMParts = new Intl.DateTimeFormat("en-US", dateDDMMOptions).format(this.dateObject);
    this.dateDDMM = dateDDMMParts.slice(3, 5) + " " + dateDDMMParts.slice(0, 2);
    this.dateYYYY = new Intl.DateTimeFormat("en-US", dateYYYYOptions).format(this.dateObject);
  }

  constructor() {
    this.dateStringChanged(this.dateString, null);
  }

}
