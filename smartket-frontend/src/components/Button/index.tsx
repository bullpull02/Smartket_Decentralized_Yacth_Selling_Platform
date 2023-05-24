import Button from '@mui/material/Button'

import { cx } from 'utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

const MButton: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <Button
      className={cx(className, 'trans rounded bg-blue-500 px-4 py-2 shadow hover:shadow-none')}
    >
      {children}
    </Button>
  )
}

export default MButton
