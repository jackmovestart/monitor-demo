import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { MitoInstance } from '..';
import { FlameChart , TimeGridPlugin, MarksPlugin, FlameChartPlugin } from 'flame-chart-js';
import { Button,message,Table,Empty, Card} from 'antd'
function getExactTime(time) {
  var date = new Date(time);
  // var date = new Date(time* 1000);
  var year = date.getFullYear() + '-';
  var month = (date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1) + '-';
  var dates = date.getDate() + ' ';
  var hour = date.getHours() + ':';
  var min = date.getMinutes() + ':';
  var second = date.getSeconds();
  return year + month + dates + hour + min + second ;
}
let t = +new Date()
// let t = 1694321556100
const Breadcurmb = () => {
  const [isStart, setIsStart] = useState(false)
  const [data,setData] = useState<any[]>([])
  function transformData(data) {
    // let href;
    let i = 0
    const newData = data?.reduce((pre, cur) => {
      // if (cur.href === href) {
      if(pre.length === 0 || cur.type === 'Route') {
        i++
        const info = {
          name:  cur?.data?.to || cur.href,
          start: cur.time - t,
          duration: 1000,  
          type: 'task',
          children: pre.length === 0 && cur.type !== 'Route' ? [{
            name: cur.data,
            start: cur.time - t,
            duration: 50,
            type: 'sub-task',
          }]  : []  
        }  
        if(cur.type === 'Route'){
          pre[pre.length-1].duration = cur?.data?.duration
        }
        // pre.push(info);
        if(i === data.length) {
          pre.push({
            ...info,
            duration: + new Date() - cur.time 
          });
        } else {
          pre.push(info);
        }
        // href = cur.href;
      } else {
        i++
        const info = {
            // name: cur.category + cur.type,
            name: cur.data,
            start: cur.time - t,
            duration: 50,
            type: 'sub-task',  
        }    
        if(i === data.length) {
          pre[pre.length - 1].duration = pre[pre.length - 1]?.[0]?.start ? + new Date() - pre[pre.length - 1]?.[0]?.start : 2000 
        } 
        pre[pre.length - 1].children.push(info);
        // const info = {
        //     name: cur.href,
        //     start: cur.time - t,
        //     duration: cur?.data?.duration || 1000,  
        //     type: 'task',
        //     children:[]    
        // }  
        // pre.push(info);
        // href = cur.href;
      }
      return pre;
    }, []);
    return newData;
  }
  // useEffect(() => {
  //     const timer = setInterval(()=>{
  //       const breadcrumb = JSON.parse(JSON.stringify(MitoInstance.breadcrumb?.getStack()))
  //       console.log(breadcrumb?.length,'breadcrumb',data?.length)
  //       if(breadcrumb?.length === data?.length ) return 

  //       setData(breadcrumb)
  //     },3000)
  //     return () => {
  //       clearInterval(timer)
  //     }
  // }, [])
  // useEffect(()=>{
  //   const canvas = document.getElementById('canvas');
  //   canvas.width = 1400;
  //   canvas.height = 600;
  //   const flameData = transformData(data)
  //   console.log(flameData,'flameData')
  //   const flameChart = new FlameChart({
  //       canvas, // mandatory
  //       data: flameData,
  //       // marks: [
  //       //     {
  //       //         shortName: 'DCL',
  //       //         fullName: 'DOMContentLoaded',
  //       //         timestamp: 500,
  //       //     },
  //       // ],
  //       waterfall: {
  //         items:[],
  //           /* ... */
  //       },
  //       timeseries: [/* ... */],
  //       timeframeTimeseries: [/* ... */],
  //       colors: {
  //           task: '#FFFFFF',
  //           'sub-task': '#000000',
  //       },
  //       settings: {
  //           options: {
  //               tooltip: (data) => {
  //                 return JSON.stringify(data)
  //                   /*...*/
  //               }, // see section "Custom Tooltip" below
  //               timeUnits: 'ms',
  //           },
  //           // styles: customStyles, // see section "Styles" below
  //       },
  //   });
  // },[data])
  const handleClick = () => {
    if(!isStart) {
      t =  + new Date()
      setIsStart(true)
    } else {
      const breadcrumb = JSON.parse(JSON.stringify(MitoInstance.breadcrumb?.getStack())).filter(item => item.time > t && item.time < + new Date())
      setData(breadcrumb)
      const canvas = document.getElementById('canvas');
      canvas.width = 1400;
      canvas.height = 300;
      const flameData = transformData(breadcrumb)
      // const flameData = [
      //   {
      //       "name": "http://localhost:3000/page-one",
      //       "start": 814,
      //       "duration": 4360,
      //       "type": "task",
      //       "children": [
      //           {
      //               "name": "<button class=\"ant-btn\">加</button>",
      //               "start": 814,
      //               "duration": 50,
      //               "type": "sub-task"
      //           },
      //           {
      //               "name": "<button class=\"ant-btn\">减</button>",
      //               "start": 1533,
      //               "duration": 50,
      //               "type": "sub-task"
      //           },
      //           {
      //               "name": "<li class=\"ant-menu-item ant-menu-item-active ant-menu-item-only-child\">示例页面二</li>",
      //               "start": 2763,
      //               "duration": 50,
      //               "type": "sub-task"
      //           }
      //       ]
      //   },
      //   {
      //       "name": "/page-two",
      //       "start": 2764,
      //       "duration": 3113,
      //       "type": "task",
      //       "children": [
      //           {
      //               "name": "<button class=\"ant-btn\">加</button>",
      //               "start": 3934,
      //               "duration": 50,
      //               "type": "sub-task"
      //           },
      //           {
      //               "name": "<button class=\"ant-btn\">减</button>",
      //               "start": 4914,
      //               "duration": 50,
      //               "type": "sub-task"
      //           },
      //           {
      //               "name": "<li class=\"ant-menu-item ant-menu-item-active ant-menu-item-only-child\">示例页面一</li>",
      //               "start": 5877,
      //               "duration": 50,
      //               "type": "sub-task"
      //           }
      //       ]
      //   },
      //   {
      //       "name": "/page-one",
      //       "start": 5877,
      //       "duration": 954,
      //       "type": "task",
      //       "children": []
      //   }
      // ]



      console.log(breadcrumb,'breadcrumbData',flameData,'flameData')
       const defaultTimeGridPluginStyles = {
        font: '10px sans-serif',
        fontColor: 'black',
    };
      const flameChart = new FlameChart({
          canvas, // mandatory
          data: flameData,
          marks: [
              // {
              //     shortName: 'DCL',
              //     fullName: 'DOMContentLoaded',
              //     timestamp: 500,
              // },
          ],
          waterfall: {
            items:[],
              /* ... */
          },
          // timeseries: flameData.map(item => ({name:'123'})),
          timeframeTimeseries: [/* ... */],
          colors: {
              task: '#FFFFFF',
              'sub-task': '#cccccc',
          },
          settings: {
              options: {
                  tooltip: (data,renderEngine) => {
                    renderEngine.render(()=><div>123</div>)
                    // return JSON.stringify(data)
                    return <div>12344444</div>
                    // return true
                      /*...*/
                  }, // see section "Custom Tooltip" below
                  timeUnits: 'ms',
              },
              // styles: customStyles, // see section "Styles" below
          },
      });
      setIsStart(false)
      flameChart.on('select', (node, type) => {
        /*...*/
        if(node.type === 'flame-chart-node') {
          const content = <div>{Object.entries(node?.node?.source).map(([key,value]) => {
            return  <div>
              {`${key}:${key === 'children' ? JSON.stringify(value) :value}`}
            </div>
          })}</div>
          
          message.info(content)
        }
      });
    }
    
  }
  const columns = [
    {
      title:'路由',
      key:'href',
      dataIndex: 'href',
      fixed: 'left' as const,
    },
    {
      title: '种类',
      dataIndex: 'category',
      key: 'category',
      width: 80,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 170,
    },
    {
      title: '描述',
      key: 'data',
      dataIndex: 'data',
      render: (data) => {
       return data.elapsedTime ? `耗时：${data.elapsedTime}` : typeof data === 'object' ? JSON.stringify(data) : 'data'
      }
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      width: 80,
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (time) => <div>{getExactTime(time)}</div>
      // width: 100,
      // fixed: 'right' as const,
    },
  ]

  return <div style={{
    display:'flex',
    justifyContent:'flex-start',
    flexDirection:'column'
  }}> 
    <Button onClick={handleClick} type='primary' style={{width:100,marginBottom:8}}>{isStart ? '停止录制' : '开始录制'}</Button>
    <Card
        title="Breadcrumb"
        style={{
          marginBottom:8
        }}
      >
        {data.length > 0 ? (
          <Table
            scroll={{ x: 1300, y: 400 }}
            rowKey="index"
            bordered
            pagination={false}
            key="index"
            columns={columns}
            dataSource={data}
          ></Table>
        ) : (
          <Empty description="用户行为栈数据为空"></Empty>
        )}
      </Card>
    <canvas id='canvas'></canvas>
      
  </div>
  // return 
   
}

export default Breadcurmb
