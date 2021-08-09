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
  constructor(
    public authService: AuthService,
    public storage: StorageService,
    private modalService: NgbModal
  ) {}
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

  ngOnInit(): void {
    this.authService.getCollection("users").subscribe((itm) => {
      this.users = [...itm];
    });
    console.log(this.users);
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
