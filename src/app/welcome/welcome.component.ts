import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TuiBlockStatusModule} from "@taiga-ui/layout";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {TuiButtonModule} from "@taiga-ui/core";
import {LogoComponent} from "../logo.component";
import {RouterLink} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {resolve} from "@angular/compiler-cli";
import {DomSanitizer} from "@angular/platform-browser";

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
    NgOptimizedImage
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit{
  img$ = new BehaviorSubject('');

  ngOnInit():void {
    import('./img').then((e)=>e.imgBuildings).then((d)=>this.img$.next(d))
  }
}
