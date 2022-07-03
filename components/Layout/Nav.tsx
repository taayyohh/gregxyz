// import { ConnectButton } from '@rainbow-me/rainbowkit'

const Nav = () => {
  return (
    <div className="fixed z-10 flex w-full items-center p-12">
      <div className={'flex flex-col justify-center items-center'}>
        <div className="text-6xl">Greg Bridges</div>
        <div className={"pt-2"}>vibe creator circa '87</div>
      </div>

      <div id="connect" className="absolute right-4">
        {/*<ConnectButton*/}
        {/*  showBalance={true}*/}
        {/*  label={'Connect'}*/}
        {/*  chainStatus={'none'}*/}
        {/*  accountStatus={'address'}*/}
        {/*/>*/}
      </div>
    </div>
  )
}

export default Nav
