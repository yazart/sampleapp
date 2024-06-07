import {ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'logo',
  standalone: true,
  template: `&lcaron;&Tstrok;&#398;&#x0218;&#428;&#x0246;&#x2608;`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  @HostBinding('style.cursor') readonly cursor = 'pointer';
  constructor(private readonly router: Router) {
  }
  @HostListener("click")
  click(): void {
    this.router.navigate(['/']).then()
  }
}
