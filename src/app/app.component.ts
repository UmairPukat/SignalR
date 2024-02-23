import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { BusinessService} from "./Service/business.service"
import { ChatNotification } from './Classes/ChatNotification';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OneTranzact';
  hubConnection: any;
  connectionId: any;
  chatNotifications: ChatNotification[] = [];

  constructor(private http: HttpClient, private BusinessService: BusinessService){

  }
  ngOnInit(): void {
    const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVGVzdEBnbWFpbC5jb20iLCJqdGkiOiIzYzY5ZDA4MS0zNWI0LTRjYTctODk2OS1jY2JlMWUzYzUwMmYiLCJVc2VySWQiOiIxIiwiZXhwIjoxNzA4NzE0NTc2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcxMDkiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxMDAifQ.7Sb12YLFpnzUs8V5w_w62sKvKu05BmlzCuqqGJvuk6w";
    
    const getAccessToken = () => {
      return "Bearer "+Token;
    };
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:5107/ConnectionHub', {
                              withCredentials: true, // Enable sending credentials (cookies) with the request
                              accessTokenFactory: getAccessToken // Provide a function to retrieve the access token
                            })
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .then(() => this.getConnectionId())
      .catch((err: string) => console.log('Error while starting connection: ' + err))

      this.hubConnection.on('AddUpdateGroupChat', (data: any) => {
        debugger
      })

      this.hubConnection.on('AddUpdateChat', (data: any) => {
        debugger
        this.chatNotifications.push(data);
      })
  }

  getConnectionId = () => {
    this.hubConnection.invoke('getconnectionid').then((data: any) => {
      console.log(data);
      this.connectionId = data;
    });
  }
}


    
