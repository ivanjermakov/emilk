import {Component} from '@angular/core'
import {TokenProvider} from '../../provider/token.provider'
import {NavigationEnd, Router} from '@angular/router'
import {filter, first, map} from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(
    private tokenProvider: TokenProvider,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map((e: NavigationEnd) => e.url)
      )
      .subscribe((path: string) => {
        if (
          path !== '/' &&
          !path.includes('/mail')
        ) {
          this.router.navigate([path])
          return
        }

        this.tokenProvider.token.observable
          .pipe(
            filter(t => !!t),
            first()
          )
          .subscribe(token => {
            console.log('token')
            if (token === '') {
              this.router.navigate(['/log-in'])
            } else {
              if (path === '/') {
                this.router.navigate(['/mail'])
              } else {
                this.router.navigateByUrl(path)
              }
            }
          })
      })
  }
}
