import { BrowserClient } from './browserClient'
import historyRoutePlugin from './plugins/historyRoute'
import domPlugin from './plugins/dom'
import consolePlugin from './plugins/console'
import xhrPlugin from './plugins/xhr'

function createBrowserInstance(options, plugins: any[] =[]) {
  const browserClient = new BrowserClient(options)
  const browserPlugins = [
    historyRoutePlugin,
    domPlugin,
    xhrPlugin
    // consolePlugin,
  ]
  browserClient.use([...browserPlugins, ...plugins])
  return browserClient
}

const init = createBrowserInstance
export { createBrowserInstance, init, BrowserClient }
