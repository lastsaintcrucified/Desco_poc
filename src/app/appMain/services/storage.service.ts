import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  public storage: any = {};
  public inMemorystorage: any = {};
  me: any;
  constructor() {
    const data = localStorage.getItem("storage");
    if (data !== null) {
      this.storage = JSON.parse(data);
      if (this.get("me")) {
        this.me = this.get("me");
      }
    }
  }

  set(key: string, value: any) {
    this.storage[key] = value;
    setTimeout(() => {
      this.update();
    }, 100);
  }

  unset(key: string) {
    delete this.storage[key];
    this.update();
  }

  get(key: string) {
    let attr = "";
    if (key.indexOf(".") > 0) {
      let oa = key.split(".");
      key = oa[0];
      attr = oa[1];
    }
    let value = this.storage[key];
    if (value === null || value === undefined) {
      // console.log("Null value for ", key);
      return "";
    }
    if (attr == "") {
      return value;
    } else {
      return value[attr];
    }
  }

  update() {
    const storage = JSON.stringify(this.storage);
    localStorage.setItem("storage", storage);
  }

  seti(key: string, value: string) {
    this.inMemorystorage[key] = value;
  }

  unseti(key: string) {
    delete this.inMemorystorage[key];
    this.update();
  }

  geti(key: string) {
    let attr = "";
    if (key.indexOf(".") > 0) {
      console.log(key);
      let oa = key.split(".");
      key = oa[0];
      attr = oa[1];
    }
    let value = this.inMemorystorage[key];
    if (value === null || value === undefined) {
      console.log("Null value for ", key);
      return "";
    }
    if (attr == "") {
      return value;
    } else {
      return value[attr];
    }
  }

  clear() {
    localStorage.clear();
    this.storage = {};
    this.inMemorystorage = {};
    this.me = null;
  }

  // USER
  username() {
    this.me = this.get("user");
    console.log(this.me);
    if (this.me.displayName) {
      return this.me.displayName;
    }
  }
}
