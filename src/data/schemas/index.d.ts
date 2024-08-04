export type TPaymentType = 'QRIS' | 'E-Money' | 'VA'
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
  onPaymentMethodChange: ({
    payment_type: TPaymentType,
    payment_method: TPaymentMethod,
  }) => void
}
