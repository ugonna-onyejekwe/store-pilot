import { PulseLoader } from 'react-spinners'
import { Icons } from '../ui/icons'
import './styles.scss'

type BotProps = {
  className?: string
  spinnerSize?: number
  botSize?: string
}

const Bot = ({ className, spinnerSize = 6, botSize }: BotProps) => {
  return (
    <div className={`${className} bot_Con`}>
      <span className="bot_icon_con">
        <Icons.Logo className="bot_icon" height={botSize} width={botSize} />
      </span>

      <span className="spinner">
        <PulseLoader size={spinnerSize} color="#3c4043" />
      </span>
    </div>
  )
}

export default Bot
