import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalRequestService } from './services/modal-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  showModal = false;

  constructor(private router: Router,private modalService:ModalRequestService) {}

  ngOnInit() {
    const user = localStorage.getItem('user');

    if(user){
      return;
    }else{
      this.showModal=true;
    }
  }

  handleModal(user:{name:string}) {

    this.showModal = false;
    localStorage.setItem('user',JSON.stringify(user));
    this.modalService.user.next(user);
    //redirect to certain user
    // this.router.navigate(['/messages/:id'])
  }
  handleLogOut(){
    this.showModal=true;
  }
}
