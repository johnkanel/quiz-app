import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
private URL = '../assets/questions.json';
  showWarning:boolean=false;
  isQuizStarted:boolean=false;
    isQuizEnded: boolean = false;
    questionsList:any[]=[];
currentQuestionNo: number = 0;
remainingTime:number = 10;
  correctAnswerCount: number = 0;
  timer = interval(1000);
  subscription: Subscription [] = [];
selectionCount:number =0;
  constructor(private http:HttpClient){}


  ngOnInit():void{

  	this.loadQuestions();
  }
  loadQuestions(){
  	this.http.get(this.URL).subscribe((res:any)=>{
  	

  		this.questionsList =res;
  	})
  }

  nextQuestion() {
    if(this.currentQuestionNo < this.questionsList.length-1) {
      this.currentQuestionNo ++;
    } else {
      this.subscription.forEach(element => {
        element.unsubscribe();
      });
    } 
  }
    finish() {
    this.isQuizEnded = true;
    this.isQuizStarted = false;  
  }
  start() {
    this.showWarning = false;
    this.isQuizEnded = false;
    this.isQuizStarted = false;  
  }
restart(options: any){
	debugger;
	this.showWarning = false;
    this.isQuizEnded = false;
    this.isQuizStarted = true; 
     this.currentQuestionNo = 0;
     this.correctAnswerCount = 0;
     this.timer = interval(1000);
     this. subscription= [];
     this.remainingTime=10;
       for (let option = 0; option < options.length; option++) {
     options[option].isSelected=false; 
}

             
}
 selectOption(option: any) {
    if(option.isCorrect) {
      this.correctAnswerCount ++;
    }
    option.isSelected = true;
  }
  isOptionSelected(options: any) {
    const selectionCount = options.filter((m:any)=>m.isSelected == true).length;
    if(selectionCount == 0) {
      return false;
    } else {
      return true;
    }
  }
  showWarningPopup(){
  	this.showWarning=true;
  }
  
  startQuiz() {
this.showWarning = false;
    this.isQuizStarted = true;  
   this.subscription.push(this.timer.subscribe(res=> {
      console.log(res);
      if(this.remainingTime != 0) {
        this.remainingTime --;
      } 
      if(this.remainingTime == 0) {
        this.nextQuestion();
        this.remainingTime = 10;
      } 
    })
   )
  }
}
  

