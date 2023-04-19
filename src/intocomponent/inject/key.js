//利用symbol进行复杂，单独模块的key的提供
//该key使用起来就像字符串一样，但在一个工程中是唯一的标识符，能够避免与其他key冲突
export const myInjectionKey=Symbol()