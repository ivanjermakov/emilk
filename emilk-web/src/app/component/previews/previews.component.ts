import {Component, OnInit} from '@angular/core'
import {ActiveAccountService} from "../../service/active-account.service"
import {AccountsProvider} from "../../provider/accounts-provider.service"
import {BoxService} from "../../service/box.service"

@Component({
	selector: 'app-previews',
	templateUrl: './previews.component.html',
	styleUrls: ['./previews.component.sass']
})
export class PreviewsComponent implements OnInit {

	constructor(
		private activeAccountService: ActiveAccountService,
		private accountProvider: AccountsProvider,
		private boxService: BoxService
	) {}

	ngOnInit(): void {}

}
