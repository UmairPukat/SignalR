import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { BusinessService} from "./Service/business.service"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OneTranzact';
  hubConnection: any;
  connectionId: any;

  constructor(private http: HttpClient, private BusinessService: BusinessService){

  }
  ngOnInit(): void {
    
    //this.GetUserMethod();
  }

  getConnectionId = () => {
    this.hubConnection.invoke('getconnectionid').then((data: any) => {
      console.log(data);
      this.connectionId = data;
    });
  }

  GetMethod(){
    this.BusinessService.GetTestData().subscribe((res: any) => {
      debugger
    })
  }

  GetUserMethod2(){
    const key = {
      FormDate: '2023-07-02T08:32:16.987Z',
      ToDate: '2023-10-02T08:32:16.987Z',
      pageNumber: 1,
      pageSize: 50
    }
    this.BusinessService.GetUserData2(key).subscribe((res: any) => {
      debugger
      const a = document.createElement('a');
      a.href = res;
      a.download = 'CMSReport.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
  }

  GetUserMethod(){
    const key = {
      agentId: 0,
      user: '',
      plateForm: '',
      isAttachment: true,
      queryType: '',
      pageNumber: 1,
      pageSize: 50
    }
    this.BusinessService.GetUserData(key).subscribe((res: any) => {
      debugger
      const a = document.createElement('a');
      a.href = res;
      a.download = 'CMSReport.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
  }

  ConntectSignalR2(){
    const Token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NWZhMzI3OS02MjVkLTQ3M2QtOGNmNS1jY2MzNzNjZGVjMjgiLCJmYW1pbHlfbmFtZSI6IjEvMjIvMjAyNCA4OjQxOjU0IEFNIiwiaWF0IjoiMS8yMi8yMDI0IDg6NDE6NTQgQU0iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEyNCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJVbWFpciBLaGFuIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidW1haXIua2hhbjA1QGliZXguY28iLCJVc2VySWQiOiIxMjQiLCJVc2VyTmFtZSI6InVtYWlyLmtoYW4wNUBpYmV4LmNvIiwiZXhwIjoxNzA1OTU2MTE0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM2OS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0MjAwIn0.XsDBFb3SOXgcWJPjUQO3cgHHxu7div2z2VkCT0r7zn8";
    
    const getAccessToken = () => {
      return "Bearer "+Token;
    };
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:7020/ConnectionHub', {
                              withCredentials: true, // Enable sending credentials (cookies) with the request
                              accessTokenFactory: getAccessToken // Provide a function to retrieve the access token
                            })
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .then(() => this.getConnectionId())
      .catch((err: string) => console.log('Error while starting connection: ' + err))

      this.hubConnection.on('AddUpdateChat', (data: any) => {
        debugger
      })
  }

  ConntectSignalR(){
    const Token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NTRhN2Y2YS04NTlhLTRjYjYtOWZkNi1lMDY1ZmI4YjU0ZGQiLCJmYW1pbHlfbmFtZSI6IjIvMjIvMjAyNCA2OjU0OjQ3IEFNIiwiaWF0IjoiMi8yMi8yMDI0IDY6NTQ6NDcgQU0iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijc5IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IkF3YWlzIE1haG1vb2QiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhd2Fpcy5tYWhtb29kQGliZXguY28iLCJVc2VySWQiOiI3OSIsIlVzZXJOYW1lIjoiYXdhaXMubWFobW9vZEBpYmV4LmNvIiwiZXhwIjoxNzA4NjI4MDg3LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM2OS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0MjAwIn0.B_KoiEZqSBbAr7sjglEatwHNpvvEeu0cvpdGoDNY9Cw";
    
    const getAccessToken = () => {
      return "Bearer "+Token;
    };
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://common-engage.enteract.app/ConnectionHub', {
                              withCredentials: true, // Enable sending credentials (cookies) with the request
                              accessTokenFactory: getAccessToken // Provide a function to retrieve the access token
                            })
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .then(() => this.getConnectionId())
      .catch((err: string) => console.log('Error while starting connection: ' + err))

      this.hubConnection.on('SendData', (data: any) => {
        debugger
      })

      this.hubConnection.on('PostData', (data: any) => {
        debugger
      })

      this.hubConnection.on('AddUpdateChat', (data: any) => {
        debugger
      })

      this.hubConnection.on('GetMessage', (data: any) => {
        debugger
      })

      this.hubConnection.on('QueryTransfer', (data: any) => {
        debugger
      })
  }


  public startConnection = () => {
    const userId = 1;
const apiUrl = `http://user.registration.witkenma.com/api/UserGetInfo/GetUserDetails?userId=${userId}`;
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJqdGkiOiIxNDlkOGUwYy1jMzFmLTQwNTgtYTJkYi00Y2FhMGQwM2U2ZWEiLCJVc2VySWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MDY4MjMyNTYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzEwOSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTEwMCJ9.OUlUIL2Pf7QiBPC4opjeFf9egLs6z275lalVAfXy8xQ";

const headers = new Headers({
    "Accept": "*/*",
    "Authorization": `Bearer ${accessToken}`,
});

const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
};

fetch(apiUrl, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

  }


}


    
