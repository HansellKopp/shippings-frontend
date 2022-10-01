import React from 'react'
import { Button, PageHeader, Skeleton, Space, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { Client, useGetClientsQuery } from './clientsApiSlice'
import {
  PlusOutlined,
  UpCircleOutlined,
  UploadOutlined
} from '@ant-design/icons'
import useTitle from 'hooks/useTitle'

const columns: ColumnsType<Client> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Link to={`/dash/clients/edit/${record._id}`}>{text}</Link>
    )
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Street',
    dataIndex: 'street',
    key: 'street',
    render: (_, record) => <span>{record.street}</span>
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    render: (_, record) => <span>{record.city}</span>
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

export const ClientsList: React.FC = () => {
  useTitle('Client List | Shopper Seguro')
  const navigate = useNavigate()
  const { data: clients, isLoading } = useGetClientsQuery({})

  const handleAddClient = () => navigate('/dash/clients/add')

  const handleUploadClient = () => navigate('/dash/clients/upload')

  const header = (
    <PageHeader
      title="Clients list"
      subTitle=""
      onBack={() => navigate('/dash')}
      extra={[
        <Button
          type="primary"
          shape="round"
          icon={<UploadOutlined style={{ fontSize: '1.5em' }} />}
          onClick={handleUploadClient}
          size={'large'}
        >
          Upload Clients
        </Button>,
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined style={{ fontSize: '1.5em' }} />}
          onClick={handleAddClient}
          size={'large'}
        >
          Add Client
        </Button>
      ]}
    ></PageHeader>
  )

  const table = isLoading ? 
    <Skeleton avatar paragraph={{ rows: 4 }} />: 
    <Table columns={columns} dataSource={clients} />

  const content = (
    <div className='grid'>
      {header}
      {table}
    </div>
  )

  return content
}
