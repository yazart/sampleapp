import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {of} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './auth.component.scss',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле не заполнено',
        email: 'Введите корректный адрес электронной почты',
        minlength: ({requiredLength}: {requiredLength: string}) =>
          (`Минимальная длинна — ${requiredLength}`),
      },
    },
  ]
})
export class AuthComponent {}
