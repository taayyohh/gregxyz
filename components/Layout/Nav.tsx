import { ConnectButton } from '@rainbow-me/rainbowkit'

const Nav = () => {
  return (
    <div className="fixed z-10 flex w-full items-center justify-center p-4">

      <div>
        <div className="text-6xl">
         Greg Bridges
        </div>
      </div>

      <div id="connect" className="absolute right-4">
        <ConnectButton
          showBalance={true}
          label={'Connect'}
          chainStatus={'none'}
          accountStatus={'address'}
        />
      </div>
    </div>
  )
}

export default Nav
