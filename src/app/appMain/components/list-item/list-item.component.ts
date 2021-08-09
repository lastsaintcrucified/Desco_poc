import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Meter } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-list-item",
  templateUrl: "./list-item.component.html",
  styleUrls: ["./list-item.component.scss"],
})
export class ListItemComponent implements OnInit {
  meterIds: any;
  meter: any;
  meters: any = [];
  page = 1;
  pageSize = 5;
  collectionSize: any;
  closeResult = "";
  mMid: string;
  mStatus: string;
  mOwner: string;
  mLocation: string;
  mBill: string;
  mType: string;
  open2(content2: string, meter: any) {
    this.mMid = meter.mid;
    this.mStatus = meter.status;
    this.mOwner = meter.owner;
    this.mBill = meter.bill;
    this.mLocation = meter.location;
    this.mType = meter.type;

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
