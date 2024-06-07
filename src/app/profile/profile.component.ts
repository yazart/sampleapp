import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ClientsApiService} from "@api";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {

  profile$ = this.api.getApiClients();

  constructor(private readonly api: ClientsApiService) {
  }
}
