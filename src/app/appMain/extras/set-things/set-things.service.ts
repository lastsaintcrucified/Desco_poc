import { Injectable } from "@angular/core";
import { Table } from "./set-things";
import { tableList } from "./set-things-data";
@Injectable({
  providedIn: "root",
})
export class SetThingsService {
  constructor() {}
  public tableList: Table[] = tableList;

  public getTable() {
    return this.tableList;
  }
}
