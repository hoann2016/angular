import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

//create UserService class
@Injectable({providedIn: 'root'})
export class UserService {  /**
   *
   */
  constructor(private http: HttpClient) {

  }
  getUsers(){
    return this.http.get<User[]>('../assets/users.json').pipe(tap(s=>console.log('ss',s)));
  }
}
