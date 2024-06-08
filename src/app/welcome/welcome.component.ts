import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TuiBlockStatusModule} from "@taiga-ui/layout";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {TuiButtonModule} from "@taiga-ui/core";
import {LogoComponent} from "../logo.component";
import {RouterLink} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {resolve} from "@angular/compiler-cli";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../auth/auth.service";
import {map} from "rxjs/operators";
import {TuiLetModule} from "@taiga-ui/cdk";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    TuiBlockStatusModule,
    NgIf,
    TuiButtonModule,
    LogoComponent,
    RouterLink,
    AsyncPipe,
    NgOptimizedImage,
    TuiLetModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit{
  img$ = new BehaviorSubject('');
  isAuthorized$ = this.auth.token$.pipe(
    map((token): boolean=> !!token)
  )

  constructor(private readonly auth: AuthService) {
  }

  ngOnInit():void {
    import('./img').then((e)=>e.imgBuildings).then((d)=>this.img$.next(d))
  }
}
