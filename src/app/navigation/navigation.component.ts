import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiTabBarModule } from '@taiga-ui/addon-mobile';
import { TuiIconModule, TuiSegmentedModule } from '@taiga-ui/experimental';

@Component({
  standalone: true,
  selector: 'app-navigation',
  imports: [
    TuiIconModule,
    RouterLink,
    RouterLinkActive,
    TuiSegmentedModule,
    TuiTabBarModule,
  ],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {}
