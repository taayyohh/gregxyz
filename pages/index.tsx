import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import workJSON from 'public/work.json'
import { unslugify, slugify } from 'utils/helpers'

interface workProps {
  type: string
  title: string
  description?: string
  date?: string
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
  const [filter, setFilter] = React.useState<string>('Radio Host')
  const workByType = React.useMemo<any | undefined>(() => {
    if (!types) return

    return types.reduce((acc: [] = [], cv: string) => {
      acc = { ...acc, [cv]: work.filter((item) => item.type === slugify(cv)) }

      return acc
    }, [])
  }, [types])

  return (
    <div className="p-12 pt-48 bg-slate-100 min-h-screen">
      <div className={'flex flex-col sm:flex-row gap-20'}>
        <div
          className={
            'flex-col bg-slate-100 border-box p-8 rounded min-w-[290px] items-center justify-center'
          }
        >
          {types &&
            types.map((type) => (
              <button
                key={type}
                className={`flex text-xl hover:text-rose-500 p-4 ${filter === type ? 'text-rose-500' : ''}`}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            ))}
        </div>
        {workByType && (
          <div className="w-full flex flex-col sm:grid lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {workByType[filter]?.map((item: workProps) => (
              <div
                key={item.title}
                className={
                  `inline-flex flex-col self-start border bg-gray-200 border-box p-4 rounded border-slate-300`
                }
              >
                <div className={'text-2xl'}>{item?.title}</div>
                <div className={'text-md'}>{item?.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
