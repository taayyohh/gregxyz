import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import workJSON from 'public/work.json'
import { unslugify, slugify } from 'utils/helpers'

interface workProps {
  type: string
  title: string
}

const Home: NextPage = () => {
  /* consume json   */
  const [work, setWork] = React.useState<workProps[]>([])
  const _work = React.useMemo(async () => {
    const jsonArray = [workJSON]

    return workJSON
  }, [])
  React.useMemo(async () => {
    const work = await _work

    setWork(work)
  }, [_work])

  /*  get types */
  const types = React.useMemo(() => {
    return work.reduce((acc: string[] = [], cv: workProps) => {
      if (!acc.includes(unslugify(cv.type))) {
        acc.push(unslugify(cv.type))
      }

      return acc.sort()
    }, [])
  }, [work])

  /*  prepare work filter */
  const [filter, setFilter] = React.useState<string>('')
  const workByType = React.useMemo<any | undefined>(() => {
    if (!types) return

    return types.reduce((acc: [] = [], cv: string) => {
      acc = { ...acc, [cv]: work.filter((item) => item.type === slugify(cv)) }

      return acc
    }, [])
  }, [types])

  return (
    <div className="flex p-12 pt-48 bg-slate-100 min-h-screen">
      <div className={'flex-col min-w-[290px] items-center justify-center'}>
        {types &&
          types.map((type) => (
            <button
              key={type}
              className={'flex text-3xl hover:text-rose-500 p-4'}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
      </div>
      {workByType && (
        <div className="w-full">
          {workByType[filter]?.map((item: workProps) => (
            <div>{item.title}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
