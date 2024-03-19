import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Member} from '../member';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  @Input() toedit!: Member
  public memberForm: FormGroup
  constructor(public builder: FormBuilder, private dataService: DataService){
    this.memberForm = this.builder.group({
      'userName': ['',[Validators.required]],
      'country':['',[Validators.required]],
      'salary':['',[Validators.required]],
      'email':['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    if (this.toedit) {
      this.memberForm.setValue(this.toedit)
    }
  }
  ngOnChanges(): void {
    this.memberForm.setValue(this.toedit)
  }


  @Output() newItemEvent = new EventEmitter<Member>();
  addNewItem(value: Member) {
    this.newItemEvent.emit(value);
  }

  showErrorMessage(name: string, display: string): string {
    let formControl = this.memberForm.get(name);
    let errorMessage: string = '';
    if (formControl?.valid) {
      errorMessage ='';
    } else if (formControl?.errors?.['required']) {
      errorMessage = `Please input ${display}`
    } else if (formControl?.errors?.['pattern']) {
      errorMessage = `must enter valid ${display}`
    } else if (formControl?.errors?.['email']) {
      errorMessage = `${display}`
    }
    return errorMessage
  }

  
  @Output() buttonClick: EventEmitter<void> = new EventEmitter();

  onButtonClick(): void {
    this.buttonClick.emit();
  }


}
