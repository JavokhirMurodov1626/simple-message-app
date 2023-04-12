import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,throwError } from 'rxjs';

export interface SentMessage {
  senderName:string,
  recipientName: string;
  messageTitle: string;
  messageContent: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  handleSendMessage(sentMessage: SentMessage) {
    return this.http.post('http://localhost:3000/message',sentMessage).pipe(catchError(this.handleError));
  }

  handleError(error:HttpErrorResponse){
    let errorMessage='unknown error occured!'
    if(!error) return throwError(errorMessage);
    errorMessage=error.error;
    return throwError(errorMessage);
  }

}
