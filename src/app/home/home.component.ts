import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalRequestService } from '../services/modal-request.service';
import { Message } from '../services/modal-request.service';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../services/messages-service.service';
import { SentMessage } from '../services/messages-service.service';
import { SearchService, User } from '../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private modalService: ModalRequestService,
    private messagesService: MessagesService,
    private searchService: SearchService
  ) {}

  error = '';

  messages: Message[] = [];
  users: User[] = [];
  hasQuery = false;
  selectedUserName:string=''
  @ViewChild('form', { static: true }) form!: NgForm;

  @Output() logOutUser = new EventEmitter<void>();

  ngOnInit() {
    this.fetchMessages(); // fetch messages when the component is initialized
    // setInterval(() => {
    //   this.fetchMessages(); // fetch messages every 5 seconds
    // }, 5000);
  }

  sendSearchData(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    let matchSpaces: any = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this.users = [];
      this.hasQuery = false;
      return;
    }
    this.searchService.getSearchedUsers(query.trim()).subscribe({
      next: (response) => {
        this.users = response;
        this.hasQuery = true;

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  selectSearchedUser(userName:string){
    this.selectedUserName=userName;
    this.users=[]
  }

  fetchMessages() {
    this.modalService.getUserMessages().subscribe({
      next: (response) => {
        this.messages = response.messages;
      },
      error: (errorMessage) => {
        this.error = errorMessage;
      },
    });
  }

  logOut() {
    this.logOutUser.emit();
    localStorage.removeItem('user');
  }

  onSubmit() {
    const senderName = localStorage.getItem('user');

    const parsedSenderName = senderName ? JSON.parse(senderName) : null;

    const message = { ...this.form.value, senderName: parsedSenderName.name };

    this.sendMessage(message);
    this.form.reset();
  }

  sendMessage(message: SentMessage) {
    this.messagesService.handleSendMessage(message).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        console.log(this.error);
      },
    });
  }
}
