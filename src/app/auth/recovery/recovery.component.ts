import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-recovery',
  imports: [],
  templateUrl: './recovery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoveryComponent {
  protected readonly phone = new FormControl<string>('', Validators.required)


}
