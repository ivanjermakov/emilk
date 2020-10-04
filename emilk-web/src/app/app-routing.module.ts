import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {LogInComponent} from './component/log-in/log-in.component'
import {RegisterComponent} from './component/register/register.component'
import {MailComponent} from './component/mail/mail.component'

const routes: Routes = [
  {
    path: 'log-in',
    component: LogInComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'mail',
    component: MailComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
