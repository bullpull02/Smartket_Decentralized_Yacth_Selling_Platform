import * as React from 'react'

export function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(async () => await factory().then((module) => ({ default: module[name] }))),
  })
}

export const cx = (...args: any[]) => args.filter(Boolean).join(' ')

export const shortenAddress = (arg: string | undefined) => {
  if (!arg) return ''
  return `${arg.slice(0, 6)}...${arg.slice(-4)}`
}
