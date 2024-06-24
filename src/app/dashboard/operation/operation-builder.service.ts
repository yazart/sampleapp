import {Injectable} from '@angular/core';
import {OperationInfo} from "@api";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {ControlType, ControlTypeConstant} from "./formly/control-type.constant";

@Injectable()
export class OperationBuilderService {
  build(operation: OperationInfo): FormlyFieldConfig[] {
    return operation.stepParams?.map((param)=>{
      return {
        key: param.identifier,
        type: this.resolveType(param.type),
        defaultValue: param.value,
        templateOptions: {
          label: param.name,
          size: 'm',
          selectOptions: param.values,
          required: param.requirements?.required || false
        }
      }
    }) || [];
  }
  resolveType(type: string | undefined): ControlType {
    if(type ==='multiple'){
      return ControlTypeConstant.Select;
    }
    return ControlTypeConstant.Input;
  }
}
