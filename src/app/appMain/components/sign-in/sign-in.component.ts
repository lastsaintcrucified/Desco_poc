import { Component, OnInit } from "@angular/core";
import { WindowService } from "../../services/window.service";
import { AuthService } from "../../services/auth.service";
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
  disabled: boolean = true;
  verificationCode: string;

  user: any;
  constructor(
    private win: WindowService,
    private router: Router,
    public authService: AuthService
  ) {}
  loginform = true;
  recoverform = false;

  ngOnInit() {
    setTimeout(() => {
      this.windowRef = this.win.windowRef;
      this.windowRef.recaptchaVerifier =
        new firebase.default.auth.RecaptchaVerifier("recaptcha-container");

      this.windowRef.recaptchaVerifier.render();
    }, 500);
  }
  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = `+88001${this.mobile}`;
    // const num = `${this.mobile}`;

    firebase.default
      .auth()
      .signInWithPhoneNumber(num, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
        if (result) {
          this.disabled = false;
        }
      })
      .catch((error) => console.log(error));
  }

  submit() {
    return this.authService.SignIn(
      this.windowRef,
      this.verificationCode,
      "/user-dashboard"
    );
  }
}
