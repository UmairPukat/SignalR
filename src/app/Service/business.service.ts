import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  Token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNzNmMTNhNi01NzhjLTRkOTgtOTE0MS0zZmQwYWQ5YWNjOGUiLCJmYW1pbHlfbmFtZSI6IjEwLzIvMjAyMyA4OjM5OjUzIEFNIiwiaWF0IjoiMTAvMi8yMDIzIDg6Mzk6NTMgQU0iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEzMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJKdW5haWQgQWhtYWQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJqdW5haWRhaG1lZC5zb2h1QGdtYWlsLmNvbSIsIlVzZXJJZCI6IjEzMCIsIlVzZXJOYW1lIjoianVuYWlkYWhtZWQuc29odUBnbWFpbC5jb20iLCJleHAiOjE2OTYzMjIzOTMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY5LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQyMDAifQ._T_F27c98Xjkcvu_P_JIJNOtvS9dFnqFxo0KLYGuwbI";
  Key = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVoYW1tYWQucml4dmFuLndhaGVlZEBnbWFpbC5jb20iLCJleHAiOjE2NzYyMzA4MjYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY5LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQyMDAifQ.NlSFdJSUQfDF0_hbXkfL_smZkfV8b9KFt4ToBFZDzO0";
  BaseUrl = environment.BaseUrl
  constructor(private http: HttpClient) { }

  addBusinessLoanForm(data: any): Observable<any>{
    return this.http.post(this.BaseUrl + 'Loan/AddBusinessForm', data);
  }
  getBusinessLoanForm(): Observable<any>{
    return this.http.get(this.BaseUrl + 'Loan/GetBusinessLoanForm');
  }

  GetTestData(): Observable<any>{
    return this.http.get('http://localhost:5019/api/SignalRConnector/GetTestData');
  }

  GetUserData(data: any): Observable<any>{
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ this.Token,
      'X-APP-KEY': this.Key
    });
    const httpOptions = {
      headers: headers_object
    };
    var result =  this.http.post('http://localhost:5019/api/Report/GetAgentReport',data, { responseType: 'text' });
    return result;
  }

  GetUserData2(data: any): Observable<any>{
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ this.Token,
      'X-APP-KEY': this.Key
    });
    const httpOptions = {
      headers: headers_object
    };
    var result =  this.http.post('https://comservices.enteract.live/api/Report/GetWhatsAppCSVData',data, { responseType: 'text' });
    return result;
  }

}
