import { Redirect, Route, Switch } from 'react-router-dom'
import { Alert, Col, Layout, Row } from 'antd'
import SiderMenu from './SiderMenu'
import BaseHeader from './BaseHeader'
import routes from '../router/routes'
import Breadcurmb from './Breadcurmb'
import { ThemeContext } from '..'
const { Content } = Layout

const BaseLayout = () => {
  return (
    <ThemeContext.Consumer>{(data)=> (
      <Layout style={{ height: '100%' }}>
      <SiderMenu />
      <Layout>
        <Content style={{ padding: '10px' }}>
        <Switch>
          {routes.map(item => (
            <Route key={item.path} path={item.path} component={item.component}></Route>
          ))}
          <Redirect to={{ pathname: routes[0].path }}></Redirect>
        </Switch>

        <div style={{ height: '302px',marginTop:'10px' }}>
          <Breadcurmb></Breadcurmb>
        </div>
        </Content>
      </Layout>
    </Layout>
     )}
     
   
    </ThemeContext.Consumer>
  )
}

export default BaseLayout
