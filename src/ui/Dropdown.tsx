interface Props {
  children: JSX.Element | JSX.Element[]
}

function Dropdown ({ children }: Props): JSX.Element {
  return (
        <div className="group relative ml-2">
            <button className="flex items-center p-2 rounded-md group-focus-within:text-soft_blue">
                <svg className="-mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>

            <div className="absolute invisible origin-top-right -translate-y-2 scale-95 transform opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:-translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 bg-text_area rounded-md -mx-28">
                {children}
            </div>
        </div>
  )
}

export default Dropdown
