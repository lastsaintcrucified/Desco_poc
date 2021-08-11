import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";

@Component({
  selector: "app-bill-pay",
  templateUrl: "./bill-pay.component.html",
  styleUrls: ["./bill-pay.component.scss"],
})
export class BillPayComponent implements OnInit {
  tempMeter: any;
  meterId: string;
  ownerId: string;
  bill: any;
  trackByFn: any;
  meterIds: any;
  meter: any;
  meters: any = [];
  active = 1;
  constructor(
    public authService: AuthService,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.meterIds = this.storage.get("user").meters;
    console.log("meterIds->", this.meterIds);
    this.meterIds.map((mid) => {
      this.authService.getMeterDoc(mid).subscribe((itm) => {
        if (itm) {
          let itemIndex = this.meters.findIndex((item) => item.mid == itm.mid);
          itemIndex >= 0 ? (this.meters[itemIndex] = itm) : null;
          console.log(itemIndex);

          if (itemIndex < 0) {
            this.meters.push(itm);
          }
        }
      });
    });
    this.meters = [...this.meters];
  }
  onPayment() {
    let tempMeter;
    this.authService.getMeterDoc(this.meterId).subscribe((itm) => {
      tempMeter = itm;
      if (
        tempMeter.owner == this.ownerId &&
        Number(tempMeter.bill) >= Number(this.bill)
      ) {
        const data = {
          bill: Number(tempMeter.bill) - Number(this.bill),
          billStatus: "pending",
        };
        this.authService.setData(this.meterId, data, "meters");
      } else if (tempMeter.owner != this.ownerId) {
        alert("This is not the owner, please give correct ownere id");
      } else if (Number(tempMeter.bill) < Number(this.bill)) {
        alert("Payment error!");
      }
    });
  }
}
