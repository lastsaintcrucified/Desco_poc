import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
import { User } from "../../services/auth.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-list-landlords",
  templateUrl: "./list-landlords.component.html",
  styleUrls: ["./list-landlords.component.scss"],
})
export class ListLandlordsComponent implements OnInit {
  user: any;
  users: any = [];
  page = 1;
  pageSize = 5;
  collectionSize: any;
  closeResult = "";
  mUid: string;
  mStatus: string;
  mDisplayname: string;
  mApprovedOn: string;
  mApprovedBy: string;
  mApplicationStatus: string;
  mMetersNumber: string;
  mTenantsNumber: string;
  open2(content2: string, user: any) {
    this.mUid = user.uid;
    this.mStatus = user.status;
    this.mDisplayname = user.displayName;
    this.mApprovedOn = user.approvedOn;
    this.mApplicationStatus = user.applicationStatus;
    this.mMetersNumber = user.meters.length;
    this.mTenantsNumber = user.tenants.number;
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
    this.authService
      .getCollectionSpecific("users", "status", "client")
      .subscribe((itm) => {
        this.users = [...itm];
      });
  }
  onStatusToggle(id, status) {
    const data = {
      applicationStatus: `${status}`,
    };
    this.authService.setData(id, data, "users");
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
