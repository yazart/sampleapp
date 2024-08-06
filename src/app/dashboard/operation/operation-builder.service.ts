import { Injectable } from '@angular/core';
import type { OperationInfo } from '@api';
import type { FormlyFieldConfig } from '@ngx-formly/core';

import type { ControlType } from './formly/control-type.constant';
import { ControlTypeConstant } from './formly/control-type.constant';

@Injectable()
export class OperationBuilderService {
  public build(operation: OperationInfo): FormlyFieldConfig[] {
    return (
      operation.stepParams?.map((param) => ({
        key: param.identifier,
        type: this.resolveType(param.type),
        defaultValue: param.value,
        templateOptions: {
          label: param.name,
          size: 'm',
          selectOptions: param.values,
          required: param.requirements?.required || false,
        },
      })) || []
    );
  }

  protected resolveType(type: string | undefined): ControlType {
    if (type === 'multiple') {
      return ControlTypeConstant.Select;
    }

    return ControlTypeConstant.Input;
  }
}
