import type { ControlConfig } from '@angular/forms';

export function formExtractorFn<T extends object>(form: {
  [K in keyof T]: ControlConfig<T[K]> | T[K] | null | undefined;
}): T {
  return Object.entries(form).reduce((acc, [key, val]) => {
    if (key && val !== undefined && val !== null) {
      return Object.assign(acc, { [key]: val }) as T;
    }

    return acc;
  }, {} as T);
}
