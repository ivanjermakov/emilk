import {Component, OnInit} from '@angular/core'
import {TokenProvider} from '../../provider/token.provider'
import {filter, first} from 'rxjs/operators'
import {AccountService} from '../../service/account.service'
import {AccountProvider} from '../../provider/account.provider'

@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
    styleUrls: ['./mail.component.sass']
})
export class MailComponent implements OnInit {

    constructor(
        private tokenProvider: TokenProvider,
        private accountProvider: AccountProvider,
        private accountService: AccountService
    ) {}

    ngOnInit(): void {
        this.tokenProvider.token.observable
            .pipe(
                filter(t => !!t),
                first()
            )
            .subscribe(() => {
                this.fetchAccounts()
            })
    }

    private fetchAccounts() {
        this.accountService.all().subscribe(accounts => {
            this.accountProvider.accounts.set(accounts)
        })
    }

}
