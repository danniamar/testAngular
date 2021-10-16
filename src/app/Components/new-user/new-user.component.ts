import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsumeApiService } from 'src/app/Services/consume-api.service';
import { dataTable } from '../user-list/user-list.component';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  newUserForm: FormGroup;
  newUser = new dataTable();
  submitted: boolean = false;
  newIdUser: number = 1;
  
  constructor(private formBuilder: FormBuilder, 
    private consumeApi : ConsumeApiService) { }

  ngOnInit() {
    this.newUser.id = 0;
    this.newUser.names = "";

    this.newUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      job: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });     
  }

  get f() { return this.newUserForm.controls}

  validation(){
    this.submitted = true;
    if(this.newUserForm.invalid){
      return false;
    }
    return true;
  }

  createUser()  {
    //this.showloader = true;
    if(this.validation())
    {
      let userData: any ={
        name : this.f.name.value,
        job: this.f.job.value,
      };
  
      this.consumeApi.createUser(userData)
      .subscribe(
        result => {
          this.newUser.id = result.id;
          this.newUser.names = result.name;
          this.newIdUser = result.id;
          this.newUser.email = this.f.email.value;

          

          //this.showloader = false;
        }, error => {
         // this.showloader = false;
          console.log(error);
        }
      ); 
    }
  }

}
