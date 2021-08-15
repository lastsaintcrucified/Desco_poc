import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-list-item",
  templateUrl: "./list-item.component.html",
  styleUrls: ["./list-item.component.scss"],
})
export class ListItemComponent implements OnInit {
  temp: any = [];
  searchArea: string;
  searchMeter: string;
  userStatus: string;
  meterIds: any;
  meter: any;
  meters: any = [];
  page = 1;
  pageSize = 20;
  collectionSize: any;
  closeResult = "";
  mMid: string;
  mStatus: string;
  mOwner: string;
  mLocation: string;
  mBill: string;
  mType: string;
  mBillStatus: string;
  open2(content2: string, meter: any) {
    meter.owner
      ? this.authService
          .getApprv(meter.owner)
          .subscribe((itm) => (this.mOwner = itm.displayName))
      : (this.mOwner = meter.owner);
    this.mMid = meter.mid;
    this.mStatus = meter.status;

    this.mBill = meter.bill;
    this.mLocation = meter.location;
    this.mType = meter.type;
    this.mBillStatus = meter.billStatus;
    this.modalService
      .open(content2, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  constructor(
    public authService: AuthService,
    public storage: StorageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userStatus = this.storage.get("user").status;
    // console.log("userStatus->",this.userStatus);

    if (this.userStatus == "super_admin" || this.userStatus == "admin") {
      this.authService.getCollection("meters").subscribe((itm) => {
        this.meters = [...itm];
        this.temp = [...this.meters];
      });
    } else {
      this.meterIds = this.storage.get("user").meters;
      console.log("meterIds->", this.meterIds);
      this.meterIds.map((mid) => {
        this.authService.getMeterDoc(mid).subscribe((itm) => {
          if (itm) {
            let itemIndex = this.meters.findIndex(
              (item) => item.mid == itm.mid
            );
            itemIndex >= 0 ? (this.meters[itemIndex] = itm) : null;
            // console.log(itemIndex);

            if (itemIndex < 0) {
              this.meters.push(itm);
              this.temp = [...this.meters];
            }
          }
        });
      });
      this.meters = [...this.meters];
    }
  }

  onStatusToggle(id, num) {
    const data = {
      status: `${num}`,
    };
    this.authService.setData(id, data, "meters");
  }

  onSearchChangeArea(e) {
    if (e.length > 0) {
      this.authService
        .getCollectionSpecific("meters", "location", e)
        .subscribe((itm) => {
          // console.log(itm);

          itm.length > 0 ? (this.meters = [...itm]) : null;
        });
    } else {
      this.meters = [...this.temp];
    }
  }
  onSearchChangeMeter(e) {
    if (e.length > 0) {
      this.authService
        .getCollectionSpecific("meters", "mid", e)
        .subscribe((itm) => {
          // console.log(itm);

          itm.length > 0 ? (this.meters = [...itm]) : null;
        });
    } else {
      this.meters = [...this.temp];
    }
  }
  // onAreaSearch() {
  //   this.authService
  //     .getCollectionSpecific("meters", "location", this.searchArea)
  //     .subscribe((itm) => {
  //       // console.log(itm);

  //       itm.length > 0 ? (this.meters = [...itm]) : null;
  //     });
  // }
  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
