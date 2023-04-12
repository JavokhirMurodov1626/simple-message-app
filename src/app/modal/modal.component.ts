import { NgForm} from '@angular/forms';
import { Component, Output, EventEmitter, ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent{
  
  @ViewChild('form',{static:true}) form!: NgForm; 

  @Output() submitModal=new EventEmitter<{name:string}>();


  constructor(private router:Router){}

  
  onSubmit() {
    this.submitModal.emit({name:this.form.value.userName});
    this.router.navigate(['/user']);
  } 
}
