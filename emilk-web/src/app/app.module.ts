import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {LogInComponent} from './component/log-in/log-in.component'
import {RegisterComponent} from './component/register/register.component'
import {MailComponent} from './component/mail/mail.component'
import {AppComponent} from "./component/app/app.component"
import {FormsModule} from "@angular/forms"
import {HttpClientModule} from "@angular/common/http"

@NgModule({
	declarations: [
		AppComponent,
		LogInComponent,
		RegisterComponent,
		MailComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
