import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { FilterPipe } from '../filter.pipe';
import { SortPipe } from '../sort.pipe'


interface Person {
  name: string;
  email: string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  contactInfo: Contact = { "_id": "", "name": "", "email": "", "phone": "" }
  contactElement: string[] = ["name", "email", "phone"]

  index: number = 0;
  cuurentPage: number = 1;
  contacts: Contact[];
  contacts2: any = {};
  contact: Contact;
  title: string = "Hello angular";
  name: string = "";
  email: string = "";
  phone: string = "";
  hideUpdate: boolean = true;
  itemsPage: number = 5;
  constructor(private contactService: ContactService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  getContact() {
    this.contactService.getContacts()
      .subscribe(contacts =>
        this.contacts = contacts);
  }
  ngOnInit() {
    this.getContact();
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, 'Thành Công!');
    this.toastr.onClickToast()
      .subscribe(toast => {
        if (toast.timeoutId) {
          clearTimeout(toast.timeoutId);
        }
        this.toastr.dismissToast(toast);
      });
  }

  //add contact

  addContact() {
    this.contactService.addContact(this.contactInfo)
      .subscribe(contact => {
        this.contacts.push(this.contact);
        this.contacts = [];
        this.showSuccess('Thêm 1 danh bạ');
        this.getContact();
      });

  }
  deleteEmployee(id: any): void {
    var contacts = this.contacts;
    let answer = confirm("Are you sure you want to delete this item?");
    if (answer) {
      this.contactService.deleteContact(id)
        .subscribe(data => {
          if (data.n == 1)
            for (var i = 0; i < contacts.length; i++)
              if (contacts[i]._id == id) {
                contacts.splice(i, 1);
                this.showSuccess('Xóa 1 danh bạ');
                this.getContact();
              }
        })
    }
  }

  pageChanged(event) {
    this.cuurentPage = event;
    this.index = (this.cuurentPage - 1) * this.itemsPage;
  }
  //button edit show contact
  editContact(id): void {

    this.hideUpdate = false;
    this.contacts2._id = this.contacts[id + this.index]._id;
    this.contacts2.name = this.contacts[id + this.index].name;
    this.contacts2.email = this.contacts[id + this.index].email;
    this.contacts2.phone = this.contacts[id + this.index].phone;

  }
  updateEmployee(_id): void {
    this.contactService.updateContact(_id, this.contacts2)
      .subscribe(data => {
        this.contacts[_id] = this.contacts2[_id];
        this.contacts2 = {};
        console.log(this.contacts2.id)
        this.showSuccess('Cập nhật 1 danh bạ');
        this.getContact();
      })
  }
  hideAdd() {
    this.hideUpdate = true;
  }

  setDisableButton(): boolean {
    if (this.name == "" || this.email == "" || this.phone == "")
      return true;
    else
      return false;
  }
  test() {
    console.log("abc");
  }

  getValue($event, type) {
    if (type == "name")
      this.contactInfo.name = $event.target.value;
    else if (type == "email")
      this.contactInfo.email = $event.target.value;
    else if (type == "phone")
      this.contactInfo.phone = $event.target.value;
  }
  
  //to upper case contact : name, email, phone
  showLabel(label: string):string{
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
}
