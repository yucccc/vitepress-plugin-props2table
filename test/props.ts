// 不会被解析  Will not be analyzed
interface T1 {
  a: number
  b: string
  c: boolean
}
interface T11 {
  d: any
}

type Union = 'a' | 'b' | 'c'
type Intersection = T1 & T11
// 会被解析  Will be analyzed
export interface T2 {
  /**
   * @description 名称
   */
  name: string
  /**
   * @description 年龄
   */
  age: number
  /**
   * @description 性别
   * @default 男
   */
  sex: '男' | '女'
  // a: any
  // b: unknown
  // c: bigint
  // d: symbol
  // e: object
  // e1: Record<string, any>
  // ops1: Intersection
  // opts: Union
}

export interface Emits {
  /**
   * @description 吃点东西
   */
  eat: (foods: string) => void
}
export interface T3 {
  /**
   * @default yuc
   */
  name: string
  /**
   * @description 年龄
   */
  age: number
}
