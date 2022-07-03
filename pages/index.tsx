import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import workJSON from 'public/work.json'
import { unslugify, slugify } from 'utils/helpers'
import { useLayoutStore } from 'stores/useLayoutStore'
import { HiMenu } from 'react-icons/hi'
import { AnimatePresence, motion } from 'framer-motion'

interface workProps {
  type: string
  title: string
  description?: string
  date?: string
  image?: string
}

const Home: NextPage = () => {
  const { isMobile } = useLayoutStore()

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
  const [filter, setFilter] = React.useState<string>('Moderator')
  const workByType = React.useMemo<any | undefined>(() => {
    if (!types) return

    return types.reduce((acc: [] = [], cv: string) => {
      acc = { ...acc, [cv]: work.filter((item) => item.type === slugify(cv)) }

      return acc
    }, [])
  }, [types, work])

  const [isOpen, setIsOpen] = React.useState(false)
  const variants = {
    initial: {
      height: 0,
    },
    open: {
      height: 'auto',
    },
  }

  return (
    <div className="p-4 sm:p-12 pt-32 sm:pt-48 bg-slate-100 min-h-screen">
      <div className={'w-10/12 mx-auto flex flex-col sm:flex-row gap-5 sm:gap-20'}>
        {isMobile && (
          <div onClick={() => setIsOpen((bool) => !bool)}>
            <HiMenu size={32} />
          </div>
        )}
        <motion.div
          initial={'initial'}
          animate={isOpen ? 'open' : 'initial'}
          variants={isMobile ? variants : undefined}
          className={
            'flex-col bg-slate-100 border-box sm:p-8 rounded min-w-[290px] items-center justify-center overflow-hidden'
          }
        >
          {types &&
            types.map((type) => (
              <button
                type="button"
                key={type}
                className={`flex text-xl hover:text-rose-500 p-4 ${
                  filter === type ? 'text-rose-500' : ''
                }`}
                onClick={() => {
                  if (isMobile) {
                    setIsOpen(false)
                  }
                  setFilter(type)
                }}
              >
                {type}
              </button>
            ))}
          <button
            type="button"
            className={
              'bg-rose-600 hover:bg-rose-700 mt-4 w-full p-4 flex items-center justify-center text-white rounded'
            }
          >
            Book Me
          </button>
        </motion.div>
        <AnimatePresence exitBeforeEnter={true}>
          {workByType && (
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col sm:grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {workByType[filter]?.map((item: workProps) => (
                <div
                  key={item.title}
                  className={`inline-flex flex-col self-start border bg-gray-200 border-box p-4 w-full rounded border-slate-300`}
                >
                  {item?.image && (
                    <div className={'flex items-center justify-center p-4'}>
                      <Image src={item?.image} />
                    </div>
                  )}
                  <div className={'text-2xl'}>{item?.title}</div>
                  <div className={'text-md'}>{item?.description}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Home
