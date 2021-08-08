import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-list-admin",
  templateUrl: "./list-admin.component.html",
  styleUrls: ["./list-admin.component.scss"],
})
export class ListAdminComponent implements OnInit {
  user: any;
  users: any = [];
  constructor(
    public authService: AuthService,
    public storage: StorageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.authService
      .getCollectionSpecific("users", "status", "admin")
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
  back() {
    this.router.navigate["/user-dashboard"];
  }
}
