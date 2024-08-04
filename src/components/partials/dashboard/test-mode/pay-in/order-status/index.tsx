// import OrderStatusQRIS from './order-status-qris'
// import OrderStatusEMoney from './order-status-emoney'
import OrderStatusVA from './order-status-va'
// import OrderStatusPaid from './order-status-paid'

const OrderStatus = ({ countdown }: { countdown: number }) => {
  return (
    <>
      {/* <OrderStatusQRIS countdown={countdown} /> */}
      {/* <OrderStatusEMoney countdown={countdown} /> */}
      <OrderStatusVA countdown={countdown} />
      {/* <OrderStatusPaid /> */}
    </>
  )
}

export default OrderStatus
