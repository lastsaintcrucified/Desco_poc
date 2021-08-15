import { Component, OnInit } from "@angular/core";
import { User } from "../../services/auth.service";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.scss"],
})
export class ListUsersComponent implements OnInit {
  temp: any = [];
  searchArea: string;
  searchUser: string;
  user: any;
  users: any = [];
  page = 1;
  pageSize = 20;
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
  constructor(
    public authService: AuthService,
    public storage: StorageService,
    private modalService: NgbModal
  ) {}
  open2(content2: string, user: any) {
    user.approvedBy
      ? this.authService
          .getApprv(user.approvedBy)
          .subscribe((itm) => (this.mApprovedBy = itm.displayName))
      : (this.mApprovedBy = "");
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

  ngOnInit(): void {
    this.authService.getCollection("users").subscribe((itm) => {
      this.users = [...itm];
      this.temp = [...this.users];
    });
    console.log(this.users);
  }
  onStatusToggle(id, status) {
    const data = {
      applicationStatus: `${status}`,
    };
    this.authService.setData(id, data, "users");
  }
  onSearchChangeArea(e) {
    if (e.length > 0) {
      this.authService
        .getCollectionSpecific("users", "address", e)
        .subscribe((itm) => {
          // console.log(itm);

          itm.length > 0 ? (this.users = [...itm]) : null;
        });
    } else {
      this.users = [...this.temp];
    }
  }
  onSearchChangeUser(e) {
    if (e.length > 0) {
      this.authService
        .getCollectionSpecific("users", "uid", e)
        .subscribe((itm) => {
          // console.log(itm);

          itm.length > 0 ? (this.users = [...itm]) : null;
        });
    } else {
      this.users = [...this.temp];
    }
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
