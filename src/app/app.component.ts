import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiDialogModule,
  TuiRootModule,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
  protected title = 'sampleapp';
}
