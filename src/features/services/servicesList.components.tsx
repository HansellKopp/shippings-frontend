import React from 'react'
import { Button, PageHeader, Space, Switch, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { Service, useGetServicesQuery } from './servicesApiSlice'
import {
  PlusOutlined,
  UploadOutlined,CheckSquareFilled, BorderOutlined
} from '@ant-design/icons'
import useTitle from 'hooks/useTitle'

const columns: ColumnsType<Service> = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    render: (text, record) => (
      <Link to={`/dash/services/edit/${record._id}`}>{text}</Link>
    )
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (text, record) => (
      <Link to={`/dash/services/edit/${record._id}`}>{text}</Link>
    )
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (text, record) => (
      (record.price||0).toLocaleString(undefined,{minimumFractionDigits: 2})
    )
  },
  {
    title: 'Price per volume',
    dataIndex: 'pricePerVolume',
    key: 'pricePerVolume',
    render: (_text, record) => (
     record.pricePerVolume ? <CheckSquareFilled style={{fontSize: 20}} />: <BorderOutlined  style={{fontSize: 20}} />
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/dash/services/edit/${record._id}`}>
          <i className="icofont-edit icofont"></i>
        </Link>
        <Link to={`/dash/services/delete/${record._id}`}>
          <i className="icofont-trash icofont"></i>
        </Link>
      </Space>
    )
  }
]

export const ServicesList: React.FC = () => {
  useTitle('Service List | Shopper Seguro')
  const navigate = useNavigate()
  const { data: services } = useGetServicesQuery({})

  const handleAddService = () => navigate('/dash/services/add')

  const handleUploadService = () => navigate('/dash/services/upload')

  const header = (
    <PageHeader
      title="Services list"
      subTitle=""
      onBack={() => navigate('/dash')}
      extra={[
        <Button
          type="primary"
          shape="round"
          icon={<UploadOutlined style={{ fontSize: '1.5em' }} />}
          onClick={handleUploadService}
          size={'large'}
        >
          Upload Services
        </Button>,
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined style={{ fontSize: '1.5em' }} />}
          onClick={handleAddService}
          size={'large'}
        >
          Add Service
        </Button>
      ]}
    ></PageHeader>
  )

  const content = (
    <div>
      {header}
      <Table columns={columns} dataSource={services} />
    </div>
  )

  return content
}
