interface Props {
  leftCol: JSX.Element
  rightCol: JSX.Element
}

function Layout ({ leftCol, rightCol }: Props): JSX.Element {
  return (
    <main className='flex flex-col pb-7 pt-2 gap-10 w-10/12 mx-auto lg:flex-row'>
      <aside className='min-w-full max-w-[50%] lg:min-w-[50%]'>{leftCol}</aside>
      <aside className='min-w-full max-w-[50%] lg:min-w-[50%]'>{rightCol}</aside>
    </main>
  )
}

export default Layout
