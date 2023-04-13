import { ViewChild, AfterViewInit, Component, } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {MatTableDataSource} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog'
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent  {
  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'action'];
  dataSource:any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;
  constructor(private service: AuthService, private dialog:MatDialog){
    this.Loaduser();
  }
  userlist: any;

  Loaduser() {
    this.service.GetAll().subscribe(res => {
      this.userlist = res;
      this.dataSource=new MatTableDataSource(this.userlist);
      this.dataSource.paginator= this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  UpdateUser(code:any){
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      width:'50%',
      data:{
        usercode:code
      }
    })
    popup.afterClosed().subscribe(res=>{

    });

  }

  opendialog(){
    this.Loaduser();
  }
}



