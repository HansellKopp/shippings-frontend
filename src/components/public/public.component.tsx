import { Card, Layout, Menu, Typography } from 'antd'
import { ReactElement } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
const { Header, Content, Footer } = Layout

const getItem = (label: ReactElement, key: string, icon: ReactElement) => {
  return {
    key,
    icon,
    label
  }
}

export const Public = () => {
  const navigate = useNavigate()

  const handleMenuClick = (e: any) => {
    e.key === 'login' ? navigate('/login') : null
  }

  const header = (
    <Header
      className="flex justify-between"
      style={{
        width: '100%',
        backgroundColor: '#f0f2f5'
      }}
    >
      <div className="flex gap-2 grow-0">
        <img alt="logo" src="src/public/bag.svg" style={{ height: 56 }} />
        <Typography.Title level={1}>Shopper seguro</Typography.Title>
      </div>
      <div>
        <Menu
          mode="horizontal"
          items={[
            getItem(
              <span className="m-2">User Login</span>,
              'login',
              <i className="icofont-login icofont-2x"></i>
            )
          ]}
          style={{
            backgroundColor: '#f0f2f5'
          }}
          onClick={handleMenuClick}
        />
      </div>
    </Header>
  )

  const footer = 
  <Footer>
      <div className="flex-1 text-center">Made with love in Berlin</div>
  </Footer>
  
  const content = (
    <section className='public'>
      {header}
      <main className="flex h-full items-center justify-center" style={{ height: "calc(100vh - 8.5rem"}}>
        <Card className="max-h-48 w-1/2" title="Shopper Seguro">
          <p>
            Located in Beautiful Miami Beach, Shopper seguro provides a trained
            staff ready to meet your international shipping needs.
          </p>
          <address className="public__addr">
            Miami Beach
            <br />
            555 Foo Drive
            <br />
            Foo City, CA 12345
            <br />
            <a href="tel:+15555555555">(555) 555-5555</a>
          </address>
          <br />
          <p>Owner: Oswaldo Moreno Leal</p>
        </Card>
      </main>
      {footer}
    </section>
  )
  return content
}
