import { Props2 } from './props2'
class PropsAll {
  constructor() {
    console.log('并不想解析的东西');
  }
}
export interface PropsAllType {
  /**
   * @description 描述a
   * @default 默认值是1
   */
  a: string
  /**
   * @description 描述b 是一个枚举值
   * @default 默认值是a
   * 
   */
  b: 'a' | 'b' | 'c'
  /**
   * 描述c是一个外部引用的类型
   */
  c: Props2
  /**
   * @description 描述e 是一个数组
   * @version 1.0.0
   */
  e: string[]
  f: Record<string, string>
}
