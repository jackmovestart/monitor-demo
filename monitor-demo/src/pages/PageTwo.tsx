import { Button, Card } from 'antd'
import { useHistory } from 'react-router-dom'
import Count from './PageOne/Count'
export default function PageTwo() {
  const history = useHistory()
  return (
    <Card>
      {/* <h1>这是示例页面二</h1> */}
      <Count desc={'页面二'}></Count>
      {/* <Button onClick={() => history.push('/page-one')}>跳转实例页面一</Button> */}
    </Card>
  )
}
