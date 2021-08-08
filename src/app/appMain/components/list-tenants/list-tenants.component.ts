import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";

@Component({
  selector: "app-list-tenants",
  templateUrl: "./list-tenants.component.html",
  styleUrls: ["./list-tenants.component.scss"],
})
export class ListTenantsComponent implements OnInit {
  user: any;
  users: any = [];
  constructor(
    public authService: AuthService,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.authService
      .getCollectionSpecific("users", "status", "tenant")
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
