import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
