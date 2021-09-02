import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hoge',
  templateUrl: './hoge.component.html',
  styleUrls: ['./hoge.component.scss']
})
export class HogeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { order: "popular" }
      });
  }

}
