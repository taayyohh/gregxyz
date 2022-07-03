
const Nav = () => {
  return (
    <div className="fixed z-10 flex w-full items-center p-4 sm:p-12">
      <div className={'flex flex-col justify-center items-center'}>
        <div className="text-2xl sm:text-6xl">Greg Bridges</div>
        <div className={"text-xs sm:text-normal pt-2"}>vibe creator circa 87</div>
      </div>

      <div id="connect" className="absolute right-4">
      </div>
    </div>
  )
}

export default Nav
