import { Component, OnInit } from "@angular/core";
import { User } from "../../services/auth.service";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.scss"],
})
export class ListUsersComponent implements OnInit {
  userIds: any;
  user: any;
  users: any = [];
  constructor(
    public authService: AuthService,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.authService.getCollection("users").subscribe((itm) => {
      this.users = [...itm];
    });
    console.log(this.users);
  }
  onStatusToggle(id, status) {
    const data = {
      applicationStatus: `${status}`,
    };
    this.authService.setData(id, data, "users");
  }
}
