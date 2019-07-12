import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// services
import { EmailSenderService } from '../../services/services.index';
// models
import { EmailMessage } from '../../models/email-message';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html'
})
export class ContactUsFormComponent implements OnInit {

  emailMessage: EmailMessage = new EmailMessage();
  messageFailedToSend = false;
  messageWasSent = false;
  sendingMessage = false;

  constructor(public _emailSender: EmailSenderService) { }

  ngOnInit() {
  }

  sendMessage(f: NgForm) {
    if (!f.valid) {
      return;
    } else {
      this.sendingMessage = true;
      this._emailSender.sendEmail(this.emailMessage)
        .subscribe(response => {
          this.messageFailedToSend = false;
          this.messageWasSent = true;
          this.sendingMessage = false;
        }, error => {
          this.messageFailedToSend = true;
          this.messageWasSent = false;
          this.sendingMessage = false;
        });
    }
  }
}
