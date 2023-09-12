// @ts-nocheck # 忽略全文

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
const { worker } = require('./mocks/browser')
import { init } from './component'
export const MitoInstance = init({
  apikey: 'abc-123',
  // dsn: '/upload',
  maxBreadcrumbs: 100,
 
})
if (process.env.NODE_ENV === 'production') {
  worker.start({
    serviceWorker: {
    },
  })
} else {
  worker.start()
}
export const ThemeContext = React.createContext({stack:MitoInstance.breadcrumb?.getStack()});

ReactDOM.render(
  <App/> ,
  document.getElementById('root')
)
