import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import * as firebase from "firebase";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  tempUserData: any;
  userData: any; // Save logged in user data
  unSubscribe: any;
  mobileNum: string;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private storage: StorageService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.getUser(user.uid);
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
        // this.SetUserDataForSignUp(user);
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
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${result.user.uid}`
          );
          this.storage.set("mobile", result.user.phoneNumber);
          this.unSubscribe = userRef.valueChanges().subscribe((user) => {
            this.tempUserData = user;
            // console.log(this.tempUserData);
          });
          // this.SetUserDataForSignUp(result.user);
          // this.userData = result.user;
        },
        (error) => {
          alert(error.message);
        }
      );
    if (this.tempUserData) {
      console.log(this.tempUserData);
      alert("User already exist!Please sign in!");
      return this.router.navigate(["/sign-in"]);
    } else {
      this.SetUserDataForSignUp(this.userData);
      this.router.navigate([url]);
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

  // dummy id IKLb6fxmIBBS21mRPCtu

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
    this.storage.clear();
    this.router.navigate([""]);
    this.userData = null;
    this.tempUserData = null;
    // return this.afAuth.signOut().then(() => {

    // });
  }

  //GET DATA

  getCollection(collectionName) {
    const meterRef: AngularFirestoreCollection<any> = this.afs.collection(
      `${collectionName}`
    );
    return meterRef.valueChanges();
  }
  getCollectionSpecific(collectionName, propName, prop) {
    const meterRef: AngularFirestoreCollection<any> = this.afs.collection(
      `${collectionName}`,
      (ref) => ref.where(propName.toLowerCase(), "==", prop.toLowerCase())
    );
    return meterRef.valueChanges();
  }
  getMeterDoc(mid) {
    const meterRef: AngularFirestoreDocument<any> = this.afs.doc(
      `meters/${mid}`
    );
    return meterRef.valueChanges();
  }
  getUser(uid) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef
      .valueChanges()
      .subscribe((user) => this.storage.set("user", user));
  }
  getApprv(uid) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef.valueChanges();
  }
  //UPDATE and SET DATA
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
    const mobileNum = this.storage.get("mobile");

    const userData: User = {
      uid: user.uid,
      displayName: "",
      nid: "",
      blood: "",
      dob: "",
      address: "",
      photoUrl: "",
      approvedBy: "",
      approvedOn: "",
      meters: [],
      tenants: [],
      status: "super_admin",
      email: "",
      applicationStatus: "approved",
      mobile: mobileNum,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  setData(id, newData, collectionName) {
    const dataRef: AngularFirestoreDocument<any> = this.afs.doc(
      `${collectionName}/${id}`
    );
    return dataRef.set(newData, { merge: true });
  }
  updateUserData(loggedInUser, updatedData) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${loggedInUser.uid}`
    );
    const mobileNum = this.storage.get("mobile");
    const userData: User = {
      uid: loggedInUser.uid,
      displayName: updatedData.displayName,
      nid: updatedData.nid,
      blood: updatedData.blood,
      dob: updatedData.dob,
      address: updatedData.address,
      photoUrl: updatedData.photoUrl,
      approvedBy: "",
      approvedOn: "",
      meters: [],
      tenants: [],
      status: "super_admin",
      email: updatedData.email,
      applicationStatus: "approved",
      mobile: mobileNum,
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
    console.log(user);
    return user !== null && user.uid ? true : false;
  }

  setDummyUserData() {
    const userRef: AngularFirestoreDocument<any> =
      this.afs.doc(`users/userid19`);
    const userData: User = {
      uid: "userid19",
      displayName: "userid19",
      nid: "4444444",
      blood: "b+",
      dob: "1-33-34",
      address: "chittagong",
      photoUrl: "fgf.jpg",
      meters: ["meterid2"],
      status: "tenant",
      email: "tenant@gmail.com",
      tenants: [],
      applicationStatus: "approved",
      approvedBy: "IKLb6fxmIBBS21mRPCtu",
      approvedOn: "12-23-23",
      mobile: "+88003434324324",
    };
    return userRef
      .set(userData, {
        merge: true,
      })
      .catch((err) => console.log(err));
  }

  setMeterData(id, owner, location) {
    const meterRef: AngularFirestoreDocument<any> = this.afs.doc(
      `meters/meterid${id}`
    );
    const meterData: Meter = {
      mid: `meterid${id}`,
      type: "2",
      status: "2",
      location: `${location}`,
      bill: "233",
      owner: `${owner}`,
      billStatus: "pending",
    };
    return meterRef
      .set(meterData, {
        merge: true,
      })
      .catch((err) => console.log(err));
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
  meters: any;
  status: string;
  email: string;
  tenants: any;
  applicationStatus: string;
  approvedBy: string;
  approvedOn: string;
  mobile: string;
}
export interface Meter {
  mid: string;
  type: string;
  status: string;
  location: string;
  bill: string;
  owner: string;
  billStatus: string;
}
