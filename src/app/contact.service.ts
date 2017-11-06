import { Injectable } from "@angular/core"
import { Http, Headers } from "@angular/http"
import { Contact } from "./contact"
import 'rxjs/add/operator/map'

@Injectable()
export class ContactService {
    contact: Contact;
    urlConfig: string = "http://localhost:3000";
    constructor(private http: Http) {
    }
    //getCOntact services
    getContacts() {
        return this.http.get(this.urlConfig + '/api/contacts')
            .map(res => res.json());
    }
    //add contact method
    addContact(newContact) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.urlConfig + '/api/contact', newContact, { headers: headers })
            .map(res => res.json());
    }

    deleteContact(id) {
        return this.http.delete(this.urlConfig + '/api/contact/' + id)
            .map(res => res.json());
    }

    updateContact(id, contact) {
        return this.http.put(this.urlConfig + '/api/contact/' + id, contact)
            .map(res => res.json());
    }
}