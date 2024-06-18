import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClientsApiService } from '@api';
import {NavigationComponent} from "../navigation/navigation.component";

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [AsyncPipe, JsonPipe, NavigationComponent],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private readonly api = inject(ClientsApiService);
  protected profile$ = this.api.getApiClients();
}
