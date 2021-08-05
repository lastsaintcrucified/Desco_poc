import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-manage-things",
  templateUrl: "./manage-things.component.html",
  styleUrls: ["./manage-things.component.scss"],
})
export class ManageThingsComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
  // addMtr() {
  //   this.authService.setMeterData();
  // }
}
