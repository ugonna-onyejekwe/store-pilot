import { PulseLoader } from 'react-spinners'
import './styles.scss'

type ButtonProps = {
  text: string
  varient?: 'outline' | 'secondary' | 'default'
  onClick?: () => void
  type?: 'submit' | 'button'
  className?: string
  isLoading?: boolean
}

const Button = ({
  className,
  text,
  varient = 'default',
  onClick,
  type = 'button',
  isLoading = false
}: ButtonProps) => {
  return (
    <button
      className={`button ${varient} ${className} `}
      onClick={onClick}
      type={type}
      disabled={isLoading}
    >
      {isLoading ? <PulseLoader size={6} color="#ece8e8" /> : text}
    </button>
  )
}

export default Button
