import { PageHeader } from 'antd'
import useTitle from 'hooks/useTitle'
import { useNavigate } from 'react-router-dom'

export const Shipments = () => {
    useTitle('Shippings List | Shopper Seguro')
    const navigate = useNavigate()
    const header = (
        <PageHeader
        title="Services list"
        subTitle=""
        onBack={() => navigate('/dash')}
        ></PageHeader>
    )
    return (
        <div>
            {header}
        </div>
    )
}