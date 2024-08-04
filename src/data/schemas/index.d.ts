export type TEMoney = 'DANA' | 'LinkAja' | 'OVO'
export type TVirtualAccount =
  | 'BCA'
  | 'MANDIRI'
  | 'BRI'
  | 'BNI'
  | 'BSI'
  | 'CIMBNiaga'
  | 'Permata'

export type TPaymentMethod = TEMoney | TVirtualAccount

export interface IPaymentMethodChange {
  onPaymentMethodChange: (method: TPaymentMethod) => void
}
