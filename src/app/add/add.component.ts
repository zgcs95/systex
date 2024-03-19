import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member} from '../member';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  @Input() toedit!: Member
  public memberForm: FormGroup
  constructor(public builder: FormBuilder){
    this.memberForm = this.builder.group({
      'userName':['',[Validators.required]],
      'country':['',[Validators.required]],
      'salary':['',[Validators.required]],
      'email':['',[Validators.required]]
    })
  }
  @Output() newEvent = new EventEmitter<boolean>();
  ngOnInit(): void {
    if (this.toedit) {
      this.memberForm.setValue(this.toedit)
    }
  }

  
  @Output() AddFormChange = new EventEmitter<boolean>();
  onSubmit(){
    this.newEvent.emit(false)
  }
  

  @Output() newItemEvent = new EventEmitter<Member>();
  addNewItem(value: Member) {
    this.newItemEvent.emit(value);
  }
}
