import { join } from 'node:path'
import { expect, test, describe } from 'vitest'
import { parseInterface } from '../src/parseInterface'
import { readFileSync } from 'node:fs'

test('解析单字符类型返回', () => {
  const com = {
    required: true,
    comments: {},
  }
  const res = parseInterface(
    `
    export interface PPP {
        a: string
    }
    `
  )

  expect(res).toEqual({
    "PPP": [
      { ...com, "name": "a", "type": "string", }
    ],
  })

  const res2 = parseInterface(
    `
      export interface PPP {
          a: string
          b: number
          c: boolean
          d: any
          e: null
          f: undefined
          g: symbol
          h: void
          i: never
      }
      `
  )

  expect(res2).toEqual({
    "PPP": [
      { ...com, "name": "a", "type": "string" },
      { ...com, "name": "b", "type": "number", },
      { ...com, "name": "c", "type": "boolean" },
      { ...com, "name": "d", "type": "any" },
      { ...com, "name": "e", "type": "null" },
      { ...com, "name": "f", "type": "undefined" },
      { ...com, "name": "g", "type": "symbol" },
      { ...com, "name": "h", "type": "void" },
      { ...com, "name": "i", "type": "never" },
    ],
  })

})


test('解析注释', () => {
  const com = {
    required: true,
    comments: {},
  }
  const res = parseInterface(
    `
    export interface PPP {
        /**
         * 描述
         * @description 123
         * @default 321
         */
        a: string
    }
    `
  )

  expect(res).toEqual({
    "PPP": [
      {
        ...com, "name": "a", "type": "string", "comments": {
          "description": "123",
          "default": "321"
        }
      }
    ],
  })

  const res2 = parseInterface(
    `
    export interface PPP {
        /**
         * 
         * 描述这个属性是做什么的
         */
        a: string
    }
    `
  )

  expect(res2).toEqual({
    "PPP": [
      {
        ...com,
        "name": "a",
        "type": "string",
        "comments": { "description": "描述这个属性是做什么的" }
      }
    ],
  })

  const res3 = parseInterface(
    `
    export interface PPP {
        /**
         * @description 121111
         * @default 'a'
         * @options 'a' | 'b' | 'c'
         */
        a: string
    }
    `
  )

  expect(res3).toEqual({
    "PPP": [
      {
        ...com, "name": "a", "type": "string", "comments":
          { "description": "121111", "default": "'a'", "options": "'a' | 'b' | 'c'" }
      }
    ],
  })

  const res4 = parseInterface(
    `
      export interface PPP {
          /**
           * 多行注释
           */
          /**
          * 
          * @default 'a'
          * @options 'a' | 'b' | 'c'
          */
          a: string
          /**
          * @description b
          * @default 'a'
          * @options 'a' | 'b' | 'c'
          */
          b: string
      }
      `
  )

  expect(res4).toEqual({
    "PPP": [
      { ...com, "name": "a", "type": "string", "comments": { "description": "多行注释", "default": "'a'", "options": "'a' | 'b' | 'c'" } },
      { ...com, "name": "b", "type": "string", "comments": { "description": "b", "default": "'a'", "options": "'a' | 'b' | 'c'" } },
    ]
  })

  const res5 = parseInterface(`
    export interface PPP {
      // 干啥的呢这个属性
      a: string
  }
  `)
  expect(res5).toEqual({
    "PPP": [
      { ...com, "name": "a", "type": "string", "comments": { "description": "干啥的呢这个属性" } },
    ]
  })
})


test('parse enum ', () => {
  const res = parseInterface(`
    export interface PPP {
      a: 'a' | 'b' | 'c'
      b: string | number
      c: 'a' | 'b' | 'c' | string | number | symbol
  }
  `)
  expect(res).toEqual({
    "PPP": [
      { required: true, comments: {}, "name": "a", "type": "a | b | c" },
      { required: true, comments: {}, "name": "b", "type": "string | number" },
      { required: true, comments: {}, "name": "c", "type": "a | b | c | string | number | symbol" },
    ]
  })
})

test('parse array', () => {
  const res = parseInterface(`
    export interface PPP {
      a: string[]
      b: (any)[]
      c: (string | number)[]
    }
  `)
  expect(res).toEqual({
    "PPP": [
      { required: true, comments: {}, "name": "a", "type": "string[]" },
      { required: true, comments: {}, "name": "b", "type": "(any)[]" },
      { required: true, comments: {}, "name": "c", "type": "(string | number)[]" },
    ]
  })

})

test('parse function ', () => {

  const res = parseInterface(`
    export interface Props {
      a: (p1: string) => void
      b: (p1: string, p2?: number) => void
      c: () => Promise<void>
      d: (p1: string, p2?: number) => {a: string, b: number}
      e: (p1: string, p2?: number) => Promise<{a: string, b: number}>
      f: (p1: string, p2?: number) => Record<string, number>
    }
  `)
  expect(res).toEqual({
    "Props": [
      { required: true, comments: {}, "name": "a", "type": "(p1: string) => void" },
      { required: true, comments: {}, "name": "b", "type": "(p1: string, p2?: number) => void" },
      { required: true, comments: {}, "name": "c", "type": "() => Promise<void>" },
      { required: true, comments: {}, "name": "d", "type": "(p1: string, p2?: number) => {a: string, b: number}" },
      { required: true, comments: {}, "name": "e", "type": "(p1: string, p2?: number) => Promise<{a: string, b: number}>" },
      { required: true, comments: {}, "name": "f", "type": "(p1: string, p2?: number) => Record<string, number>" },
    ]
  })

})

test('just parse export interface ', () => {
  const res = parseInterface(`
    interface PPP {
      a: string
    }
    export interface PPP2 {
      b: string
    }
  `)
  expect(res).toEqual({
    PPP2: [
      { required: true, comments: {}, "name": "b", "type": "string" },
    ]
  })
  const res2 = parseInterface(`
  interface P1 {
    a: string
  }
  interface P2 {
    a: string
  }
  export interface P3 {
    b: P1
    c: P2
  }
`)
  expect(res2).toEqual({
    P3: [
      { required: true, comments: {}, "name": "b", "type": "P1" },
      { required: true, comments: {}, "name": "c", "type": "P2" },
    ]
  })
})