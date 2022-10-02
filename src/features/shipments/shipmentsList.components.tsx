import { PlusOutlined } from '@ant-design/icons'
import { Button, PageHeader, Skeleton, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { Shipment, useGetShipmentsQuery } from 'features/shipments/shipmentsApiSlice'
import useTitle from 'hooks/useTitle'
import { Link, useNavigate } from 'react-router-dom'

const columns: ColumnsType<Shipment> = [
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
    render: (text, record) => (
      <Link to={`/dash/shipments/edit/${record._id}`}>{text}</Link>
    )
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Sender',
    dataIndex: 'sender',
    key: 'sender',
    render: (_, record) => <span>{record.sender}</span>
  },
  {
    title: 'Receiver',
    dataIndex: 'receiver',
    key: 'receiver'
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/dash/clients/edit/${record._id}`}>
          <i className="icofont-edit icofont"></i>
        </Link>
        <Link to={`/dash/clients/delete/${record._id}`}>
          <i className="icofont-trash icofont"></i>
        </Link>
      </Space>
    )
  }
]

export const Shipments = () => {
  const navigate = useNavigate()
  const { data: shipments, isFeching } = useGetShipmentsQuery({})
  useTitle('Shipments List | Shopper Seguro')
  const handleAddShipment = () => {}

  const header = (
    <PageHeader
      title="Shipments list"
      subTitle=""
      onBack={() => navigate('/dash')}
      extra={[
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined style={{ fontSize: '1.5em' }} />}
          onClick={handleAddShipment}
          size={'large'}
        >
          Add Shippment
        </Button>
      ]}
    ></PageHeader>
  )

  const table = isFeching ? (
    <Skeleton avatar paragraph={{ rows: 4 }} />
  ) : (
    <Table columns={columns} dataSource={shipments} />
  )

  const content = (
    <div className="grid">
      {header}
      {table}
    </div>
  )

  return content
}
