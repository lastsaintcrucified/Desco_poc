import { Injectable } from "@angular/core";
import { Table } from "./set-things";
import { tableList } from "./set-things-data";
import { StorageService } from "../../services/storage.service";
@Injectable({
  providedIn: "root",
})
export class SetThingsService {
  constructor(public storage: StorageService) {}
  public tableList: Table[] = tableList;

  public getTable() {
    return this.tableList;
  }
}
