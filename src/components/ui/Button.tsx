import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  icon,
  fullWidth,
  className,
  children,
  ...props
}: Props) {
  const classes = [
    'btn',
    `btn--${variant}`,
    fullWidth ? 'btn--full' : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} {...props}>
      {children}
      {icon && icon}
    </button>
  )
}
