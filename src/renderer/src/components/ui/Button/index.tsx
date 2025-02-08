import './styles.scss'

type ButtonProps = {
  text: string
  varient?: 'outline' | 'secondary' | 'default'
  onClick?: () => void
  type?: 'submit' | 'button'
  className?: string
}

const Button = ({
  className,
  text,
  varient = 'default',
  onClick,
  type = 'button'
}: ButtonProps) => {
  return (
    <button className={`button ${varient} ${className} `} onClick={onClick} type={type}>
      {text}
    </button>
  )
}

export default Button
