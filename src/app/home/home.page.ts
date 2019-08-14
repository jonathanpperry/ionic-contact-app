import { Component } from '@angular/core';
import { Contacts, ContactName, Contact, ContactField } from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myContacts: Contact[] = [];
  constructor(
    private contacts: Contacts,
    private callNumber: CallNumber,
    private sms: SMS,
    private toastController: ToastController,
  ) {}

    loadContacts() {
      let options = {
        filter: '',
        multiple: true,
        hasPhoneNumber: true
      };

      this.contacts.find(['*'], options).then((contacts: Contact[]) => {
        this.myContacts = contacts;
        console.log('Contacts: ', contacts);
      });
    }

    sendSms(contact: Contact) {
      this.sms.send(contact.phoneNumbers[0].value, 'This is my predefined message to you!');
    }

    call(contact: Contact) {
      this.callNumber.callNumber(contact.phoneNumbers[0].value, true);
    }

    createContact() {
      let contact: Contact = this.contacts.create();

      contact.name = new ContactName(null, 'Albus', 'Ape');
      contact.phoneNumbers = [ new ContactField('mobile', '12345678') ];
      contact.save().then(
        async () => {
          let toast = await this.toastController.create({
            message: 'Contact added!'
          });
          toast.present();
        },
        (error: any) => console.error('Error saving contact.', error)
      );
    }

}
