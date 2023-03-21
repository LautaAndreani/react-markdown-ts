interface Props {
  children: string | JSX.Element | JSX.Element[]
  event?: React.MouseEventHandler<HTMLButtonElement> | undefined
  hasIcon?: boolean
}

function Button ({ children, event, hasIcon }: Props): JSX.Element {
  return (
    <button
      className='flex items-center gap-2 bg-text_area border border-check_box-border rounded-lg px-[15px] py-[10px] hover:bg-dark transition w-fit'
      onClick={event}
    >
      {(hasIcon ?? false) && <img src='/github.svg' alt='github icon' />}
      {children}
    </button>
  )
}

export default Button
