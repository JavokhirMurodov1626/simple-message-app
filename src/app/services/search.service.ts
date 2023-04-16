import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

 export interface User{
  id:number,
  name:string
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { 
  }

  getSearchedUsers(inputValue:string){
    return this.http.post<User[]>('https://simple-message-app.onrender.com/users',{
    inputValue
    })
  }
}
