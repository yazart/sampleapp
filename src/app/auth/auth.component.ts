import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
