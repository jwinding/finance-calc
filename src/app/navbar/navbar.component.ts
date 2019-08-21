import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../results/results.service'



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private results: ResultsService) { 

  }


  public showInfo(){
    this.results.showInfo();
  }

  ngOnInit() {
  }

}
