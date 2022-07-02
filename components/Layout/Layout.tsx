import React from 'react'
import Nav from './Nav'
import { useSigner } from 'wagmi'
import { useLayoutStore } from 'stores/useLayoutStore'

type Props = {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  const { data, isError, isLoading } = useSigner()

  const { setSigner, setProvider } = useLayoutStore()
  const { setIsMobile } = useLayoutStore()

  const signer = React.useMemo(() => {
    return data
  }, [isLoading, isError, data])

  React.useEffect(() => {
    if (!!signer) {
      const provider = signer?.provider
      setSigner(signer)
      if (!!provider) {
        setProvider(provider)
      }
    }
  }, [signer])

  /* add mobile flag to layout store  */
  React.useEffect(() => {
    if (!!window) {
      window.addEventListener('resize', handleResize)
      setIsMobile(window.innerWidth <= 768)
    }
  }, [])

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}

export default Layout
