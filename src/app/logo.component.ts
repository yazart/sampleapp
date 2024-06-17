import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'logo',
  template: '&#206;&Tstrok;&#398;&#x0218;&#428;&#8721;&#8478;',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  private readonly router = inject(Router);
  @HostBinding('style.cursor')
  protected readonly cursor = 'pointer';

  @HostListener('click')
  protected click(): void {
    this.router.navigate(['/']).then();
  }
}
