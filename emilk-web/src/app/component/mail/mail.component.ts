import {Component, OnInit} from '@angular/core'
import {TokenProvider} from '../../provider/token.provider'
import {filter, first} from 'rxjs/operators'
import {AccountService} from '../../service/account.service'
import {AccountProvider} from '../../provider/account.provider'
import {StatusProvider} from '../../provider/status.provider'
import {Target} from '../../model/Target'
import {Event} from '../../model/Event'

@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
    styleUrls: ['./mail.component.sass']
})
export class MailComponent implements OnInit {

    constructor(
        private tokenProvider: TokenProvider,
        private accountProvider: AccountProvider,
        private accountService: AccountService,
        private statusProvider: StatusProvider
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
        this.statusProvider.status.set({target: Target.ACCOUNTS, event: Event.LOADING})
        this.accountService.all().subscribe(accounts => {
            this.statusProvider.status.set({target: Target.ACCOUNTS, event: Event.LOADED})
            this.accountProvider.accounts.set(accounts)
        })
    }

}
