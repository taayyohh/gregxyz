import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import workJSON from 'public/work.json'
import { unslugify } from 'utils/helpers'

const Home: NextPage = () => {
  const [work, setWork] = React.useState([])
  const _work = React.useMemo(async () => {
    const jsonArray = [workJSON]

    return workJSON
    // return await Promise.all(jsonArray.map(url => fetch(url))).then(async res => {
    //     return Promise.all(res.map(async data => await data.json()))
    // })
  }, [])
  React.useMemo(async () => {
    const work = await _work

    // @ts-ignore
    setWork(work)
  }, [_work])

  /*  get types */
  const types = React.useMemo(() => {
    return work.reduce((acc: string[] = [], cv: { type: string }) => {
      if (!acc.includes(cv.type)) {
        acc.push(unslugify(cv.type))
      }

      return acc
    }, [])
  }, [work])

  console.log('t', types)

  return (
    <div className="p-12">
      <h1 className={'text-3xl sm:text-6xl'}>Greg Bridges</h1>
      <div className={'flex-col'}>
        {types &&
          types.map((type) => (
            <button key={type} className={'flex text-3xl hover:text-rose-500 p-4'}>
              {type}
            </button>
          ))}
      </div>
    </div>
  )
}

export default Home
