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
  email: string;
  photoName: string;
  user: any = this.storageService.get("user");
  pName: string = this.user.displayName ? this.user.displayName : null;
  pNid: string = this.user.nid ? this.user.nid : null;
  pblood: string = this.user.blood ? this.user.blood : null;
  pAddress: string = this.user.address ? this.user.address : null;
  pDob: string = this.user.dob ? this.user.dob : null;
  pEmail: string = this.user.email ? this.user.email : null;
  pBlood: string = this.user.blood ? this.user.blood : null;
  addressArray: any = this.pAddress ? this.pAddress.split("*") : [];
  pStreet: string = this.pAddress ? this.addressArray[0] : null;
  pCity: string = this.pAddress ? this.addressArray[1] : null;
  pState: string = this.pAddress ? this.addressArray[2] : null;
  pPost: string = this.pAddress ? this.addressArray[3] : null;
  constructor(
    public authService: AuthService,
    public storageService: StorageService
  ) {}

  ngOnInit(): void {
    // console.log(this.user);
  }

  // getPhotoUrl(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.photoUrl = event.target.files[0].name;

  //     // var reader = new FileReader();

  //     // reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     // reader.onload = (event) => {
  //     //   // called once readAsDataURL is completed
  //     //   this.localUrl = event.target.result;
  //     // };
  //   }
  // }

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
      this.email &&
      this.photoUrl
    ) {
      const address = [this.addP1, this.addP2, this.addP3, this.addP4].join(
        "*"
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
        email: this.email,
      };
      this.authService.updateUserData(this.user, updatedData);
    } else {
      alert("FIll up all the field!");
    }
  }

  //base64
  imageSrc: string = "";
  imageString: string = "";
  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    this.photoName = e.target.files[0].name;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    //base64image stream
    this.imageSrc = reader.result;
    this.compress(this.imageSrc, 200).then((newImg: any) => {
      this.imageString = newImg;

      this.photoUrl = this.imageString;
      console.log(this.photoUrl);
    });
  }

  //compress image
  compress(src: any, width: number = 200) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement("canvas");
        const newX = width; //max width
        const newY = (img.height * newX) / img.width;
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext("2d");
        ctx?.drawImage(img, 0, 0, newX, newY);
        const data = ctx?.canvas.toDataURL();
        res(data);
      };
      img.onerror = (error) => rej(error);
    });
  }
}
