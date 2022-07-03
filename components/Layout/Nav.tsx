// import { ConnectButton } from '@rainbow-me/rainbowkit'

const Nav = () => {
  return (
    <div className="fixed z-10 flex w-full items-center p-4 sm:p-12">
      <div className={'flex flex-col justify-center items-center'}>
        <div className="text-2xl sm:text-6xl">Greg Bridges</div>
        <div className={"text-xs sm:text-normal pt-2"}>vibe creator circa '87</div>
          {/*<div className={'flex h-32 w-32 rounded-full'}>*/}
          {/*    <img src="https://arweave.net/ro4ciCRDxRPrtPX6GTl028KhBf1bAIoWVOZNOiGjwgQ" />*/}
          {/*</div>*/}
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
