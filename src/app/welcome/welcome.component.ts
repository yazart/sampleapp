import {AsyncPipe, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiBlockStatusModule } from '@taiga-ui/layout';
import { BehaviorSubject, map } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { LogoComponent } from '../logo.component';

@Component({
  standalone: true,
  selector: 'app-welcome',
  imports: [
    TuiBlockStatusModule,
    NgIf,
    TuiButtonModule,
    LogoComponent,
    RouterLink,
    AsyncPipe,
    NgOptimizedImage,
    TuiLetModule,
    NgStyle,
  ],
  templateUrl: './welcome.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent implements OnInit {
  protected readonly auth = inject(AuthService);
  protected img$ = new BehaviorSubject('');
  protected pattern$ = new BehaviorSubject('');
  protected isAuthorized$ = this.auth.isAuthorized$;

  public ngOnInit(): void {
    import('./img').then((e) => e.imgBuildings).then((d) => this.img$.next(d));
    import('./pattern').then((e) => e.patternImg).then((d) => this.pattern$.next(d));
  }
}
