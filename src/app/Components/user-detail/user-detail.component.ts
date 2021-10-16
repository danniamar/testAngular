import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConsumeApiService } from 'src/app/Services/consume-api.service';
import { dataTable } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() idUser: number;
  @Input() newUser: dataTable;
  
  showloader = false;
  userName : string;
  userLastName: string;
  email: string;
  avatar: string;

  constructor(private consumeApi : ConsumeApiService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getUserInfo();
  }

  getUserInfo()
  {
    this.showloader = true;
    this.consumeApi.getUserDetails(this.idUser)
    .subscribe(
      result => {
        console.log();
        this.userName = result["data"].first_name;
        this.userLastName = result["data"].last_name;
        this.email = result["data"].email;
        this.avatar = result["data"].avatar;
        this.showloader = false;
      }, error => {
        this.showloader = false;
        console.log(error);
        this.userLastName = "";
        this.userName = this.newUser.names;
        this.email = this.newUser.email;
        this.avatar = "https://upload.wikimedia.org/wikipedia/commons/7/72/Avatar_icon_green.svg";
      }
    );
  }

}
