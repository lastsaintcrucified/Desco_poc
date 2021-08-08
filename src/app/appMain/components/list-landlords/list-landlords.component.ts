import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
import { User } from "../../services/auth.service";
@Component({
  selector: "app-list-landlords",
  templateUrl: "./list-landlords.component.html",
  styleUrls: ["./list-landlords.component.scss"],
})
export class ListLandlordsComponent implements OnInit {
  user: any;
  users: any = [];
  constructor(
    public authService: AuthService,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.authService
      .getCollectionSpecific("users", "status", "client")
      .subscribe((itm) => {
        this.users = [...itm];
      });
  }
  onStatusToggle(id, status) {
    const data = {
      applicationStatus: `${status}`,
    };
    this.authService.setData(id, data, "users");
  }
}
