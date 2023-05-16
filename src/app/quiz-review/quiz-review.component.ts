import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-review',
  templateUrl: './quiz-review.component.html',
  styleUrls: ['./quiz-review.component.scss'],
})
export class QuizReviewComponent {
  @Input() questions: any = []; // Input property to receive the questions array

  // Method to get the correct answer for a given question
  getCorrectAnswer(question: any): string {
    const correctOption = question.options.find(
      (option: any) => option.correct
    );
    return correctOption ? correctOption.text : 'No correct answer';
  }
}
