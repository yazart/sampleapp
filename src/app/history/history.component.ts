import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-history',
  imports: [],
  templateUrl: './history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './history.component.scss',
})
export class HistoryComponent {}
