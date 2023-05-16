import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from './../service/question.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  name: string = '';
  questionList: any[] = [];
  currentQuestion: number = 0;
  points: number = 0;
  timer: number = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: Subscription | undefined;
  progress: string = '0';
  isQuizCompleted: boolean = false;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || '';
    this.getAllQuestions();
    this.startCounter();
  }

  ngOnDestroy(): void {
    this.stopCounter();
  }

  getAllQuestions(): void {
    // Fetch the list of questions from the service
    this.questionService.getQuestionJson().subscribe((response) => {
      this.questionList = response.questions;
    });
  }

  nextQuestion(): void {
    // Move to the next question
    this.currentQuestion++;
    this.resetCounter();
  }

  prevQuestion(): void {
    // Move to the previous question
    this.currentQuestion--;
  }

  answer(currentQno: number, option: any): void {
    if (currentQno === this.questionList.length) {
      // Check if the quiz is completed
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      // If the selected option is correct
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 500);
    } else {
      // If the selected option is incorrect
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 500);
    }
  }

  startCounter(): void {
    // Start the timer
    this.interval$ = interval(1000).subscribe(() => {
      this.timer--;
      if (this.timer === 0) {
        // Move to the next question if the timer reaches 0
        this.currentQuestion++;
        this.timer = 60;
      }
    });

    setTimeout(() => {
      this.stopCounter();
    }, 600000);
  }

  stopCounter(): void {
    // Stop the timer
    if (this.interval$) {
      this.interval$.unsubscribe();
    }
    this.timer = 0;
  }

  resetCounter(): void {
    // Reset the timer
    this.stopCounter();
    this.timer = 60;
    this.startCounter();
  }

  getProgressPercent(): string {
    // Calculate the progress percentage
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
    return this.progress;
  }
}
