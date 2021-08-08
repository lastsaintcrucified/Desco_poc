import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
@Component({
  selector: "app-list-super-admin",
  templateUrl: "./list-super-admin.component.html",
  styleUrls: ["./list-super-admin.component.scss"],
})
export class ListSuperAdminComponent implements OnInit {
  user: any;
  users: any = [];
  constructor(
    public authService: AuthService,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.authService
      .getCollectionSpecific("users", "status", "super_admin")
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
