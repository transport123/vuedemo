import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root:'./',//项目根目录，在使用开发服务器时起作用，就像nginx的location一样，指定静态服务器的根目录
  base:'/dist/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    hmr:true
  },
  build:{
    chunkSizeWarningLimit:1000,
    rollupOptions:{
     /* output:{
        manualChunks(id){//自定义chunk规则，将不同的模块放入不同的chunk，保证单个chunk块不会过大
          //但是对于单模块本身就很大的情况有些无能为力，像element-plus就有600+kb，无法控制拆分，只能适当提高chunksize的警告上限
          if(id.includes('node_modules'))
          {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();//将所有的模块名提取出来，每个模块单独放入chunk。这样的方式会不会有些太“松散”了
          }//注意这里split一定要把路径写对，少了/结果会很不一样。也可以return同一个字符串将所有模块放入一个chunk，但这样单个chunk就过大了
          //如果需要合理配置或许可以采取一些折衷的方法。默认情况下模块会被合并到引用该模块的chunk中，且不会出现多次引用重复的问题，感觉这种默认的行为就很科学
        }
      }*/
    }
  }
})
