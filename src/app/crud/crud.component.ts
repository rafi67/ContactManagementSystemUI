import { Component, OnInit } from '@angular/core';
import { Contact, BtnValue } from 'src/models/contacts.model';
import { ContactsService } from 'src/service/contacts.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  contacts: Contact[] = [];
  contact: Contact = {
    id: '',
    name: '',
    phoneNumber: '',
    date: ''
  };
  btnName: BtnValue = {
    name: 'Save'
  };
  constructor(private contactsService:ContactsService) {}
  ngOnInit(): void {
    this.getAllContact();
  }
  dateFormatter(date:string) : string {
    var data: string = '';
    for(let i=0; i<10; i++) data += date.charAt(i);
    return data;
  }
  getAllContact() {
    this.contactsService.getAll().subscribe(
      response => {
       for(let i=0; i<response.length; i++) {
          response[i].date = this.dateFormatter(response[i].date);
        }
        this.contacts = response;
      }
    );
  }
  clear() {
    this.contact = {
      id: '',
      name: '',
      phoneNumber: '',
      date: ''
    };
    this.btnName.name = 'Save';
  }
  addContact() {
    if(this.contact.id==='') {
      this.contactsService.addContact(this.contact).subscribe(
        response => {
          this.getAllContact();
          this.clear();
        }
      );
    }
    else {
      this.updateContact();
    }
  }
  updateContact() {
    this.contactsService.updateContact(this.contact).subscribe(
      response => {
        this.getAllContact();
        this.clear();
      }
    );
  }
  editContact(contact:Contact) {
    this.contact = contact;
    this.btnName.name = 'Update';
  }
  deleteContact(id:string) {
    this.contactsService.deleteContact(id).subscribe(
      response => {
        this.getAllContact();
      }
    );
  }
}
