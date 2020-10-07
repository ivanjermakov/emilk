import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {LogInComponent} from './component/log-in/log-in.component'
import {RegisterComponent} from './component/register/register.component'
import {MailComponent} from './component/mail/mail.component'
import {AppComponent} from './component/app/app.component'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {PreviewsComponent} from './component/previews/previews.component'
import {MessageComponent} from './component/message/message.component'
import {AccountComponent} from './component/account/account.component'
import {ClickOutsideModule} from 'ng-click-outside'
import {BoxComponent} from './component/box/box.component'
import {FolderComponent} from './component/folder/folder.component'
import {ActiveAccountComponent} from './component/active-account/active-account.component'
import {BoxesComponent} from './component/boxes/boxes.component'
import {LeftComponent} from './component/left/left.component'
import {DelimiterComponent} from './component/delimiter/delimiter.component'
import {AccountsPopupComponent} from './component/accounts-popup/accounts-popup.component'
import {AccountActionsComponent} from './component/account-actions/account-actions.component'
import {AccountActionComponent} from './component/account-action/account-action.component'
import {PreviewsBoxesSwitcherComponent} from './component/previews-boxes-switcher/previews-boxes-switcher.component'

@NgModule({
    declarations: [
        AppComponent,
        LogInComponent,
        RegisterComponent,
        MailComponent,
        PreviewsComponent,
        MessageComponent,
        AccountComponent,
        BoxComponent,
        FolderComponent,
        ActiveAccountComponent,
        BoxesComponent,
        LeftComponent,
        DelimiterComponent,
        AccountsPopupComponent,
        AccountActionsComponent,
        AccountActionComponent,
        PreviewsBoxesSwitcherComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ClickOutsideModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
