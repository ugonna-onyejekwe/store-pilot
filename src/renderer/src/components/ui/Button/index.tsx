import './styles.scss'

type ButtonProps = {
  text: string
  varient?: 'outline' | 'secondary' | 'default'
  onClick?: () => void
  type?: 'submit' | 'button'
}

const Button = ({ text, varient = 'default', onClick, type = 'button' }: ButtonProps) => {
  return (
    <button className={`button ${varient} `} onClick={onClick} type={type}>
      {text}
    </button>
  )
}

export default Button
