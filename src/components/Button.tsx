type Props = {
  children: string
  event: React.MouseEventHandler<HTMLButtonElement> | undefined
  hasIcon?: boolean
}

function Button({ children, event, hasIcon }: Props) {
  return (
    <button
      className='flex items-center gap-2 bg-text_area border border-check_box-border rounded-lg px-[15px] py-[10px] hover:bg-dark transition w-fit'
      onClick={event}
    >
      {hasIcon && <img src='/github.svg' alt='github icon' />}
      {children}
    </button>
  )
}

export default Button
