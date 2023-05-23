import { cx } from 'utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button className={cx(className, 'px-4 py-2 shadow')} {...props}>
      {children}
    </button>
  )
}

export default Button
