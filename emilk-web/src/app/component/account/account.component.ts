import {Component, Input, OnInit} from '@angular/core'
import {Account} from '../../model/Account'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  @Input()
  account: Account

  constructor() {}

  ngOnInit(): void {}

}
