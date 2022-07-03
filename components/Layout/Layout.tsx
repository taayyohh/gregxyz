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
  }, [data])

  React.useEffect(() => {
    if (!!signer) {
      const provider = signer?.provider
      setSigner(signer)
      if (!!provider) {
        setProvider(provider)
      }
    }
  }, [signer])
  
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 639)
  }
  /* add mobile flag to layout store  */
  React.useEffect(() => {
    if (!!window) {
      window.addEventListener('resize', handleResize)
      setIsMobile(window.innerWidth <= 639)
    }
  }, [handleResize, setIsMobile])



  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}

export default Layout
