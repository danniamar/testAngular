import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ConsumeApiService } from 'src/app/Services/consume-api.service';

export class  dataTable {
  id: number;
  names: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userTable : Array<dataTable> = [];
  showloader = false;
  dataSourceUser = null;
  displayedColumns: string[] = ['names', 'editUser', 'deleteUser'];
  idUser: number = 1;
  delete: boolean = false;
  update: boolean = false;
  interval;

  @Input() newUser: dataTable;
  @Input() newIdUser: dataTable;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(private consumeApi : ConsumeApiService) { }

  ngOnInit() {
    this.getUserList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.newUser.id > 0){
      let user = new dataTable();
          user.id = this.newUser.id;
          user.names = this.newUser.names;
          user.email = this.newUser.email;

      this.userTable.push(user);
      this.userTable.sort((a, b) => (a.id > b.id ? -1 : 1));
      this.idUser = this.userTable[0].id;
      this.dataSourceUser = new MatTableDataSource<dataTable>(this.userTable);
      this.dataSourceUser.paginator = this.paginator;
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceUser.paginator) {
      this.dataSourceUser.paginator.firstPage();
    }
  }

  getUserList()
  {
    this.showloader = true;
    this.consumeApi.getUserList(1)
    .subscribe(
      result => {
        result["data"].forEach(data => {  
          let user = new dataTable();
          user.id = data.id;
          user.names = data.first_name + " " + data.last_name;

          this.userTable.push(user);
        });

        this.userTable.sort((a, b) => (a.id > b.id ? -1 : 1));

        this.idUser = this.userTable[0].id;

        // Assign the data to the data source for the table to render
        this.dataSourceUser = new MatTableDataSource<dataTable>(this.userTable);
        this.dataSourceUser.paginator = this.paginator;
        this.showloader = false;
      }, error => {
        this.showloader = false;
        console.log(error);
      }
    );
  }

  deleteUser(id)
  {
    var i = 0;
    this.userTable.forEach(data => {
      if ( data.id === id) { 
        this.userTable.splice(i, 1); 
    }
    i++;
    });

    this.userTable.sort((a, b) => (a.id > b.id ? -1 : 1));
    this.idUser = this.userTable[0].id;

    this.dataSourceUser = new MatTableDataSource<dataTable>(this.userTable);
    this.dataSourceUser.paginator = this.paginator;
    this.delete = true;
    this.interval = setInterval(() => {
      this.closeAlert()
    },5000)
  }

  closeAlert()
  {
    this.delete = false;
    this.update = false;
  }

  detailsUser(id)
  {
    this.idUser = id;

    this.userTable.forEach(data => {
      if ( data.id === id) { 
        this.newUser = data;
    }
    });
  }
}
