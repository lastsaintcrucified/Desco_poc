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
  status: string = this.user.status;
  meters: string = this.user.meters.length;
  tenants: string = this.user.tenants.length;
  active = 1;
  apprvBy: string;
  appStat: string = this.user.applicationStatus;

  constructor(
    public storage: StorageService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserDoc(this.user.approvedBy);
    this.apprvBy = this.storage.get("approver").displayName;
  }
  signOut() {
    this.authService.SignOut();
  }
}
