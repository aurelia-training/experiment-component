import {customElement, inject} from "aurelia-framework";
import {App} from "../app";

@customElement("au-di-experiment")
@inject(App)
export class DiExperiment {
  formattedTestDataItem:string;

  constructor(public app:App) {
    this.formattedTestDataItem = "*** " + this.app.testDataItem + " ***";
  }
}
