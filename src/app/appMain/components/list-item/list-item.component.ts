import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Meter } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
@Component({
  selector: "app-list-item",
  templateUrl: "./list-item.component.html",
  styleUrls: ["./list-item.component.scss"],
})
export class ListItemComponent implements OnInit {
  meterIds: any;

  meters: any = [];
  constructor(
    public authService: AuthService,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.meterIds = this.storage.get("user").meters;
    this.meterIds.map((mid) => {
      this.meters.push(this.authService.getMeterDoc(mid));
    });

    console.log(this.meters);
  }
}
