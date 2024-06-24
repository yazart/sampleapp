export const ControlTypeConstant = {
  Input: 'input',
  Select: 'select',
  Date: 'datepicker',
  Radio: 'radio'
} as const;

export type ControlTypeKeys = keyof typeof ControlTypeConstant;

export type ControlType = typeof ControlTypeConstant[ControlTypeKeys]
