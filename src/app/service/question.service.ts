import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {} // Injecting the HttpClient into the service

  // Method to get the JSON data containing the questions
  // Using the HttpClient to make an HTTP GET request to 'assets/questions.json'
  // and returning the response as an observable of type 'any'
  getQuestionJson() {
    return this.http.get<any>('assets/questions.json');
  }
}
