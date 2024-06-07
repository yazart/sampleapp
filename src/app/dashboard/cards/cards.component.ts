import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-cards',
  imports: [],
  templateUrl: './cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cards.component.scss',
})
export class CardsComponent {}
