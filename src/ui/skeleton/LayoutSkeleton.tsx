import Button from '../../components/Button'

function Layout (): JSX.Element {
  return (
    <main className="flex pb-7 pt-2 gap-10 w-10/12 mx-auto">
      <aside className="min-w-[50%] max-w-[50%] h-[90vh] rounded-md animate-pulse bg-text_area"></aside>
      <aside className="min-w-[50%] max-w-[50%] h-[90vh] flex flex-col justify-end items-end">
        <Button>
          <span className='min-w-[5rem] h-[1.2rem] bg-[#43495c] px-[15px] py-[10px] animate-pulse rounded-md'></span>
        </Button>
      </aside>
    </main>
  )
}

export default Layout
