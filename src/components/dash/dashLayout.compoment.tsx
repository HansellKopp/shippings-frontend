import { Outlet } from 'react-router-dom'
import { DashHeader } from './dashHeader.component'
import { DashFooter } from './dashFooter.component'
import { Layout } from 'antd';

const { Content } = Layout;

export const DashLayout = () => {
    return (
        <section className='private'>
            <DashHeader />
            <Content style={{ height: "calc(100vh - 8rem )", paddingLeft: 50, paddingRight: 10, paddingTop: 20} }>
                <Outlet />
            </Content>
            <DashFooter />
        </section>
    )
}