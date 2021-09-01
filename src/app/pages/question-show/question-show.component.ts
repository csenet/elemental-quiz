import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { DataService } from 'src/shared/data.service';
import { ElementData } from 'src/shared/ElementData';

@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.scss']
})
export class QuestionShowComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  form!: FormGroup
  whichToAsk: string = "名前"
  count: number = 1

  selections!: string[]

  data!: ElementData[]

  ngOnInit(): void {
    this.addTestData()
    this.buildForm()
    this.getData()
  }

  private buildForm() {
    this.form = this.fb.group({
      number: [null],
      symbol: [null],
      name: [null],
      use: [null],
      description: [null],
      state: [null],
      mt: [null],
      bp: [null]
    })
  }

  get number(): FormControl {
    return this.form.get('number') as FormControl
  }

  private getData(): void {
    this.dataService.getData().subscribe((data) => {
      this.data = data
      // データが取得できたら問題を選ぶ
      this.setQuestion()
    })
  }

  private addTestData(): void {
    this.selections = ["あ", "い", "う", "え"]
  }

  private getRandomNumber(min: number, max: number) {
    return (Math.floor(Math.random() * (max + 1 - min)) + min)
  }

  private selectQuestion(): ElementData {
    const nq = this.data.length
    const questionIndex = this.getRandomNumber(0, nq - 1)
    // 同時に選択肢も決定する
    this.setSelections(questionIndex, nq)
    return this.data[questionIndex]
  }

  private setSelections(questionIndex: number, nq: number): void {
    /* 以下は選択肢を決定するためのもの */
    this.selections = []
    this.selections.push(this.data[questionIndex].name)
    while (this.selections.length < 4) {
      const randomIndex = this.getRandomNumber(0, nq - 1)
      console.log(randomIndex)
      if (randomIndex === questionIndex) continue;
      this.selections.push(this.data[randomIndex].name)
    }
  }

  private setQuestion() {
    const question: ElementData = this.selectQuestion()
    this.form.patchValue({
      number: question.no,
      symbol: question.symbol,
      name: question.name,
      use: question.use,
      description: question.description,
      state: question.state,
      mt: question.mt,
      bp: question.bp
    })
  }

}
