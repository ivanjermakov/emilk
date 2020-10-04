import {Component, OnInit} from '@angular/core'
import {Account} from "../../model/Account"
import {AccountsProvider} from "../../provider/accounts-provider.service"
import {filter} from "rxjs/operators"
import {ActiveAccountService} from "../../service/active-account.service"
import {Boxes} from "../../model/Boxes"
import {BoxService} from "../../service/box.service"

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent implements OnInit {

	expanded: boolean = false
	accounts: Account[]
	activeAccount: Account
	otherAccounts: Account[]
	boxes: Boxes

	constructor(
		private accountProvider: AccountsProvider,
		private activeAccountService: ActiveAccountService,
		private boxService: BoxService
	) {}

	ngOnInit(): void {
		this.accountProvider.accounts.observable
			.pipe(filter(a => !!a))
			.subscribe(accounts => {
				this.updateActiveOtherAccounts(accounts)
			})
	}

	updateActiveOtherAccounts(accounts: Account[]): void {
		this.accounts = accounts
		let activeAccountEmail = this.activeAccountService.get()
		let activeAccount = this.accounts.find(a => activeAccountEmail && a.user === activeAccountEmail)
		if (activeAccount) {
			this.activeAccount = activeAccount
		} else {
			this.activeAccount = this.accounts[0]
		}
		this.otherAccounts = this.accounts.filter(a => a.user !== this.activeAccount.user)

		this.boxService.all(this.activeAccount.user).subscribe(boxes => {
			this.boxes = boxes
		})
	}

	setActive(account: Account) {
		this.activeAccountService.set(account.user)
		this.updateActiveOtherAccounts(this.accounts)
	}

}
