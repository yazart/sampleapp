import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  TuiCardModule, TuiCellModule, TuiFadeModule, TuiHeaderModule,
  TuiIconModule,
  TuiSegmentedModule,
  TuiSurfaceModule, TuiThumbnailCardModule,
  TuiTitleModule
} from "@taiga-ui/experimental";
import {NavigationComponent} from "../navigation/navigation.component";
import {TuiButtonModule, TuiLinkModule, TuiSvgModule} from "@taiga-ui/core";
import {TuiRepeatTimesModule} from "@taiga-ui/cdk";
import {TuiRippleModule} from "@taiga-ui/addon-mobile";
import {FormsModule} from "@angular/forms";
import {TuiMoneyModule} from "@taiga-ui/addon-commerce";

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    TuiSegmentedModule,
    NavigationComponent,
    TuiButtonModule,
    TuiTitleModule,
    TuiIconModule,
    TuiCardModule,
    TuiRepeatTimesModule,
    TuiSurfaceModule,
    TuiHeaderModule,
    TuiRippleModule,
    TuiThumbnailCardModule,
    TuiSvgModule,
    TuiFadeModule,
    FormsModule,
    TuiLinkModule,
    TuiCellModule,
    TuiMoneyModule
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected surfAccount = 0;
}
