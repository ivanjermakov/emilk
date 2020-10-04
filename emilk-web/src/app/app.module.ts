import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {LogInComponent} from './component/log-in/log-in.component'
import {RegisterComponent} from './component/register/register.component'
import {MailComponent} from './component/mail/mail.component'
import {AppComponent} from "./component/app/app.component"
import {FormsModule} from "@angular/forms"
import {HttpClientModule} from "@angular/common/http"
import {AccountsComponent} from './component/accounts/accounts.component'
import {PreviewsComponent} from './component/previews/previews.component'
import {MessageComponent} from './component/message/message.component'
import {AccountComponent} from './component/account/account.component'
import {ClickOutsideModule} from "ng-click-outside"
import {BoxComponent} from './component/box/box.component'
import {FolderComponent} from './component/folder/folder.component'

@NgModule({
	declarations: [
		AppComponent,
		LogInComponent,
		RegisterComponent,
		MailComponent,
		AccountsComponent,
		PreviewsComponent,
		MessageComponent,
		AccountComponent,
		BoxComponent,
		FolderComponent
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
