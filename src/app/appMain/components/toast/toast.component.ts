import { Component, OnInit } from "@angular/core";
import { ToastService } from "./toast.service";
@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  show = true;
  showauto = false;
  autohide = true;

  close() {
    this.show = false;
    setTimeout(() => (this.show = true), 5000);
  }

  showStandard() {
    this.toastService.show("I am a standard toast");
  }

  showSuccess() {
    this.toastService.show("I am a success toast", {
      classname: "bg-success text-light",
      delay: 10000,
    });
  }

  showDanger(dangerTpl: string) {
    this.toastService.show(dangerTpl, {
      classname: "bg-danger text-light",
      delay: 15000,
    });
  }
}
