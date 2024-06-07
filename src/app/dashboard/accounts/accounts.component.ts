import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-accounts',
  imports: [],
  templateUrl: './accounts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {}
