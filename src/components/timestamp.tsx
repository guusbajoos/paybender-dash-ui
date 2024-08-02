interface IIimestampProps {
  date: string
  time: string
}

const Timestamp = ({ date, time }: IIimestampProps) => {
  return (
    <span className='text-sm font-medium text-[#777677]'>
      {date} | {time}
    </span>
  )
}

export default Timestamp
