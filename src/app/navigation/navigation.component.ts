import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TuiButtonGroupModule, TuiIconModule, TuiSegmentedModule, TuiSurfaceModule} from "@taiga-ui/experimental";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TuiTabBarModule} from "@taiga-ui/addon-mobile";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    TuiIconModule,
    RouterLink,
    RouterLinkActive,
    TuiSegmentedModule,
    TuiTabBarModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

}
