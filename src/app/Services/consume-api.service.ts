import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsumeApiService {

  constructor(private http: HttpClient) { }

  getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        /*"Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',*/
      })
    };

    return httpOptions;
  }

  createUser(data){
    return this.http.post<any>("https://reqres.in/api/users", data, this.getHttpOptions()).pipe();
  }

  getUserList(page: number){
    return this.http.get<any>("https://reqres.in/api/users?page=" + page + "&&per_page=100", this.getHttpOptions()).pipe();
  }

  getUserDetails(id: number){
    return this.http.get<any>("https://reqres.in/api/users/" + id, this.getHttpOptions()).pipe();
  }
}
