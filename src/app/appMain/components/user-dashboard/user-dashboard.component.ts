import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.scss"],
})
export class UserDashboardComponent implements OnInit {
  user = this.storage.get("user");
  displayName: string = this.user.displayName;
  blood: string = this.user.blood;
  nid: string = this.user.nid;
  address: string = this.user.address;
  dob: string = this.user.dob;

  active = 1;
  constructor(
    public storage: StorageService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // console.log(this.user);
  }
  signOut() {
    this.authService.SignOut();
  }
}
