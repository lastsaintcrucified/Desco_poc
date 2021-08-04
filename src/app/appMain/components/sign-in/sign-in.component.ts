import { Component, OnInit } from "@angular/core";
import { WindowService } from "../../services/window.service";
import * as firebase from "firebase";
import { Router } from "@angular/router";
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  mobile: string;
  windowRef: any;

  verificationCode: string;

  user: any;
  constructor(private win: WindowService, private router: Router) {}
  loginform = true;
  recoverform = false;

  ngOnInit() {
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

  verifyLoginCode() {
    this.router.navigateByUrl("/user-dashboard");
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result) => {
        this.user = result.user;
      })
      .catch((error) => console.log(error, "Incorrect code entered?"));
    if (this.user) {
    }
  }
}
