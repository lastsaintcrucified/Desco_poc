import { Component, OnInit } from "@angular/core";
import { WindowService } from "../../services/window.service";
import { AuthService } from "../../services/auth.service";
import * as firebase from "firebase";
import { Router } from "@angular/router";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  mobile: string;
  windowRef: any;

  verificationCode: string;

  user: any;
  constructor(
    private win: WindowService,
    private router: Router,
    public authService: AuthService
  ) {}
  loginform = true;
  recoverform = false;

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier =
      new firebase.default.auth.RecaptchaVerifier("recaptcha-container");

    this.windowRef.recaptchaVerifier.render();
  }
  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = `+880${this.mobile}`;

    firebase.default
      .auth()
      .signInWithPhoneNumber(num, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
      })
      .catch((error) => console.log(error));
  }

  submit() {
    this.authService.SignUpWithMobile(
      this.windowRef,
      this.verificationCode,
      "/update-profile"
    );
  }
}
