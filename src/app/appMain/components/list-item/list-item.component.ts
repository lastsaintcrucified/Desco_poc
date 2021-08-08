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
  meter: any;
  meters: any = [];

  constructor(
    public authService: AuthService,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.meterIds = this.storage.get("user").meters;
    this.meterIds.map((mid) => {
      this.authService.getMeterDoc(mid).subscribe((itm) => {
        let itemIndex = this.meters.findIndex((item) => item.mid == itm.mid);
        this.meters[itemIndex] = itm;
        if (itemIndex < 0) {
          this.meters.push(itm);
        }
      });
    });

    console.log(this.meters);
  }
  onStatusToggle(id, num) {
    const data = {
      status: `${num}`,
    };
    this.authService.setData(id, data, "meters");
  }
}
