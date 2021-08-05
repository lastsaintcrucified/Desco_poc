import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import * as firebase from "firebase";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private storage: StorageService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.getUser(this.userData.uid);
      } else {
        this.storage.set("user", null);
      }
    });
  }

  SignUp(name: string, email: string, password: string, photo: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (result: any) => {
        // result.user.displayName = name;
        // this.SetUserDate(result.user);

        const user = { ...result.user };
        user.displayName = name;
        user.photoURL = photo;
        this.SetUserDataForSignUp(user);
      },
      (error) => {
        alert(error.message);
      }
    );
  }
  SignUpWithMobile(windowRef: any, verificationCode: string, url: string) {
    var credential = firebase.default.auth.PhoneAuthProvider.credential(
      windowRef.confirmationResult.verificationId,
      verificationCode
    );
    firebase.default
      .auth()
      .signInWithCredential(credential)
      .then(
        (result) => {
          this.SetUserDataForSignUp(result.user);
          this.userData = result.user;
        },
        (error) => {
          alert(error.message);
        }
      );
    if (this.userData) {
      this.storage.set("user", this.userData);
      this.router.navigate([url]);
    } else {
      this.storage.set("user", null);
    }
  }
  SignIn(windowRef: any, verificationCode: string, url: string) {
    windowRef.confirmationResult
      .confirm(verificationCode)
      .then((result) => {
        this.userData = result.user;
      })
      .catch((error) => console.log(error, "Incorrect code entered?"));
    if (this.userData) {
      this.getUser(this.userData.uid);
      this.router.navigate([url]);
    } else {
      this.storage.set("user", null);
    }
  }

  // SignIn(email: string, password: string) {
  //   return this.afAuth.signInWithEmailAndPassword(email, password).then(
  //     (result) => {
  //       this.SetUserDate(result.user);
  //     },
  //     (error) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.storage.clear();
      this.router.navigate([""]);
    });
  }

  getUser(uid) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef
      .valueChanges()
      .subscribe((user) => this.storage.set("user", user));
  }
  updateLocalStorageData(uid) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef.valueChanges().subscribe((user) => {
      this.storage.clear();
      this.storage.set("user", user);
    });
  }
  SetUserDataForSignUp(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      displayName: "",
      nid: "",
      blood: "",
      dob: "",
      address: "",
      photoUrl: "",
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  updateUserData(loggedInUser, updatedData) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${loggedInUser.uid}`
    );
    const userData: User = {
      uid: loggedInUser.uid,
      displayName: updatedData.displayName,
      nid: updatedData.nid,
      blood: updatedData.blood,
      dob: updatedData.dob,
      address: updatedData.address,
      photoUrl: updatedData.photoUrl,
    };
    return userRef
      .set(userData, {
        merge: true,
      })
      .then(() => {
        this.updateLocalStorageData(this.storage.get("user").uid);
        this.router.navigate(["/user-dashboard"]);
        alert("Success!");
      });
  }

  get isLoggedIn(): boolean {
    const user = this.storage.get("user");
    return user !== null && user.uid ? true : false;
  }
}

export interface User {
  uid: string;
  displayName: string;
  nid: string;
  blood: string;
  dob: string;
  address: string;
  photoUrl: string;
}
