
import { ConfirmService } from 'src/app/shared/modal/confirm/confirm.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { DataService } from 'src/app/shared/data.service';
import { ElementData } from 'src/app/shared/ElementData';

@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.scss']
})
export class QuestionShowComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataService: DataService, private confirmService: ConfirmService) { }

  form!: FormGroup
  whichToAsk: string = "名前"
  count: number = 0
  score: number = 0

  selections: string[] = ["", "", "", ""]

  data!: ElementData[]

  answer!: string

  maxQurstion: number = 5 //出題される問題数

  isResult: boolean = false

  result: string = ""

  ngOnInit(): void {
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

  shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private setSelections(questionIndex: number, nq: number): void {
    /* 以下は選択肢を決定するためのもの */
    this.selections = []
    const answer = this.data[questionIndex].name
    this.selections.push(answer)
    this.answer = answer
    while (this.selections.length < 4) {
      const randomIndex = this.getRandomNumber(0, nq - 1)
      if (randomIndex == questionIndex) continue;
      this.selections.push(this.data[randomIndex].name)
    }
    this.selections = this.shuffle(this.selections)
  }

  private setQuestion() {
    if (this.count >= this.maxQurstion) {
      this.showResult();
      return
    }
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
    this.count++;
  }

  private showResult() {
    this.isResult = true
    this.result = `${this.score}/${this.maxQurstion}`
  }

  public async register(selected: string) {
    // 正解と比較
    if (selected === this.answer) {
      // 正解
      this.score++;
      await this.confirmService.show(true)
    } else {
      // 不正解
      await this.confirmService.show(false);
    }
    this.setQuestion()
  }

}
