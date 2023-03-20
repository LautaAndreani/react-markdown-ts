interface Props {
  leftCol: JSX.Element
  rightCol: JSX.Element
}

function Layout ({ leftCol, rightCol }: Props): JSX.Element {
  return (
    <main className='flex pb-7 pt-2 gap-10 w-10/12 mx-auto'>
      <aside className='min-w-[50%] max-w-[50%]'>{leftCol}</aside>
      <aside className='min-w-[50%] max-w-[50%]'>{rightCol}</aside>
    </main>
  )
}

export default Layout
