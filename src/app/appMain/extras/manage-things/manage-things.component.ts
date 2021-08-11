import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-manage-things",
  templateUrl: "./manage-things.component.html",
  styleUrls: ["./manage-things.component.scss"],
})
export class ManageThingsComponent implements OnInit {
  @Input() user: any;
  super_admin: string = "super_admin";
  admin: string = "admin";
  client: string = "client";
  tenant: string = "tenant";
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
  // addMtr() {
  //   this.authService.setMeterData();
  // }
}
