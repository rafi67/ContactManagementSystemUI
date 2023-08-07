import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/models/contacts.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  baseUrl = 'https://localhost:7274/api/contacts';
  constructor(private http:HttpClient) { }
  getAll() : Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl);
  }
  addContact(contact:Contact) : Observable<Contact> {
    contact.id = '0';
    return this.http.post<Contact>(this.baseUrl, contact);
  }
  updateContact(contact:Contact) : Observable<Contact> {
    return this.http.put<Contact>(this.baseUrl+'/'+contact.id, contact);
  }
  deleteContact(id:string) : Observable<Contact> {
    return this.http.delete<Contact>(this.baseUrl+'/'+id);
  }
}
