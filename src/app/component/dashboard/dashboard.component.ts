import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr :Task[] = [];
  
  addTaskValue : string = '';
  editTaskValue : string = '';
  addTimeValue : any = '';
  editTimeValue : any = '';

  today = new Date();
  currentTime:any ;  
  notify : boolean = false;
  i:any = 0;
  
  isDisabled:boolean=false;
  
  
  
  constructor(private crudService:CrudService) {
    this.isDisabled = false
  }
  
  ngOnInit(): void {
    console.log(this.currentTime);
    console.log(this.taskObj.time);
    console.log(this.taskObj);
    // console.log("taskkkkkkkk"+this.taskArr);
    
    console.log(this.notify);
    
    
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.editTimeValue='';
    this.addTimeValue = '';
    
    this.taskObj = new Task()
    this.taskArr = [];
    this.getAllTask();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // this.notification(this.currentTime='')
    //Action for change
  }
  
  getAllTask() {
    this.crudService.addAllTask().subscribe(res=>{
      this.taskArr = res;
      // console.log(res);
      
    },err=>{
      alert("Enable to get the List")
    })
  }
  
  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.taskObj.time = this.addTimeValue;
    

    this.crudService.addTask(this.taskObj).subscribe(res=> {
      this.ngOnInit();
      this.addTaskValue = '';
      this.addTimeValue = '';

    },err => {
      alert(err);
    })
  }
  
  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.taskObj.time = this.addTimeValue;
    
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("Failed to update task");
      
    })
  }
  
  deleteTask(etask :Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("Failed to delete task")
    })
  }
  
  call(etask : Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name
  }

  
  // notification(currentTime:any){
    
  //   this.crudService.addAllTask().subscribe(res=>{
  //     this.taskArr = res;
      
  //     for(let i of res){
  //       // currentTime = this.today.getHours() + ":" + this.today.getMinutes();
        
        
  //       if(i.time == this.currentTime){
  //         this.notify == true;
  //         console.log(this.notify);
          
  //       }  
  //       else{
  //         this.notify == false;
  //       }
        
  //     }

  //   }
  //   )


  //   for( let i of taskObj){
  //   if(this.taskObj.time = this.currentTime){
  //       this.notify == true;
  //       console.log(this.notify);
              
  //   }
  //   else{
  //     this.notify == false;      

  //   }
  // }
  // }

  radioclick(etask:Task){
    
    this.isDisabled = !this.isDisabled
    // this.isDisabled = false;
  }


}
