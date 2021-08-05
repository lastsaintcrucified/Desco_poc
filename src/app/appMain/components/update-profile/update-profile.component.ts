import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";

@Component({
  selector: "app-update-profile",
  templateUrl: "./update-profile.component.html",
  styleUrls: ["./update-profile.component.scss"],
})
export class UpdateProfileComponent implements OnInit {
  firstName: string;
  lastName: string;
  blood: string;
  dob: string;
  nid: string;
  addP1: string;
  addP2: string;
  addP3: string;
  addP4: string;
  photoUrl: string;
  user: any = this.storageService.get("user");

  constructor(
    public authService: AuthService,
    public storageService: StorageService
  ) {}

  ngOnInit(): void {
    // console.log(this.user);
  }

  getPhotoUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.photoUrl = event.target.files[0].name;

      // var reader = new FileReader();

      // reader.readAsDataURL(event.target.files[0]); // read file as data url

      // reader.onload = (event) => {
      //   // called once readAsDataURL is completed
      //   this.localUrl = event.target.result;
      // };
    }
  }

  onClick() {
    if (
      this.firstName &&
      this.lastName &&
      this.dob &&
      this.blood &&
      this.nid &&
      this.addP1 &&
      this.addP2 &&
      this.addP3 &&
      this.addP4 &&
      this.photoUrl
    ) {
      const address = [this.addP1, this.addP2, this.addP3, this.addP4].join(
        ","
      );
      console.log(this.photoUrl);
      const dsiplayName = [this.firstName, this.lastName].join(" ");
      const updatedData = {
        uid: this.user.uid,
        displayName: dsiplayName,
        nid: this.nid,
        blood: this.blood,
        dob: this.dob,
        address: address,
        photoUrl: this.photoUrl,
      };
      this.authService.updateUserData(this.user, updatedData);
    } else {
      alert("FIll up all the field!");
    }
  }
}
