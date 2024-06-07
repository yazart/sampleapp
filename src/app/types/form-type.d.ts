import {ControlConfig} from "@angular/forms";

export type ControlConfigMap<T> = {
  [K in keyof T]: T[K] | ControlConfig<T[K]>
};
