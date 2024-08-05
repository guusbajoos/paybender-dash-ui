export type TPaymentType = 'QRIS' | 'E-Money' | 'VA'
export type TEMoney = 'DANA' | 'LinkAja' | 'OVO'
export type TVirtualAccount =
  | 'BCA Virtual Account'
  | 'Mandiri Virtual Account'
  | 'BRI Virtual Account'
  | 'BNI Virtual Account'
  | 'BSI Virtual Account'
  | 'CIMBNiaga Virtual Account'
  | 'Permata Virtual Account'

export type TPaymentMethod = TEMoney | TVirtualAccount

export interface IPaymentMethodChange {
  onPaymentMethodChange: ({
    payment_type: TPaymentType,
    payment_method: TPaymentMethod,
  }) => void
}
