import { Link } from 'react-router-dom'
import { Card } from 'antd'
const { Meta } = Card;

export const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="flex items-center justify-center"  >

            <div className='flex flex-wrap bg-slate-100 gap-4 p-4'>

            <Link to="/dash/clients">
                <Card
                    hoverable
                    style={{ width: 180 }}
                    cover={<div className='justify-center p-2' style={{ display: "grid"}}><div><i className="icofont-user-alt-5 icofont-4x"></i></div></div>}
                >
                    <Meta title="Clients"/>
                </Card>
            </Link>

            <Link to="/dash/services">
                <Card
                    hoverable
                    style={{ width: 180 }}
                    cover={<div className='justify-center p-2' style={{ display: "grid"}}><div><i className="icofont-files-stack icofont-4x"></i></div></div>}
                >
                    <Meta title="Services"/>
                </Card>
            </Link>
            
            <Link to="/dash/shipments">
                <Card
                    hoverable
                    style={{ width: 180 }}
                    cover={<div className='justify-center p-2' style={{ display: "grid"}}><div><i className="icofont-truck-loaded icofont-4x"></i></div></div>}
                >
                    <Meta title="Shipments"/>
                </Card>
            </Link>

            <Link to="/dash/users">
                <Card
                    hoverable
                    style={{ width: 180 }}
                    cover={<div className='justify-center p-2' style={{ display: "grid"}}><div><i className="icofont-user icofont-4x"></i></div></div>}
                >
                    <Meta title="Users"/>
                </Card>
            </Link>

        </div>

        </section>
    )

    return content
}