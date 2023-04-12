import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, switchMap,map } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface Message {
  content: string;
  createdAt: string;
}

interface ModalResponseData {
  user: {
    name: string;
  };
  messages: Message[];
}

@Injectable({
  providedIn: 'root',
})
export class ModalRequestService {
  constructor(private http: HttpClient) {}

  user = new BehaviorSubject({ name: '' });

  getUserMessages() {
    const senderName = localStorage.getItem('user');

    const parsedSenderName = senderName ? JSON.parse(senderName) : null;

    return this.http
      .post<ModalResponseData>('http://localhost:3000/user', parsedSenderName)
      .pipe(
        map((response) => {
          const updatedMessages = response.messages.map((message) => {
            const createdAt = new Date(message.createdAt);
            const time = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return {
              content: message.content,
              createdAt: time,
            };
          });
          return { ...response, messages: updatedMessages };
        }),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'unknown error occured!';
    if (!error) return throwError(errorMessage);
    errorMessage = error.error;
    return throwError(errorMessage);
  }
}
