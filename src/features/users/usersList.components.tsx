import React from 'react'
import type { ColumnsType } from 'antd/es/table'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { Button, PageHeader, Skeleton, Space, Table, Tag } from 'antd'
import { User, useGetUsersQuery } from './usersApiSlice'
import useTitle from 'hooks/useTitle'

const columns: ColumnsType<User> = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text, record) => (
      <Link to={`/dash/users/edit/${record._id}`}>{text}</Link>
    )
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    key: 'roles',
    render: (_text, record) => record.roles.map(role => <Tag key={role}>{role}</Tag>)
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/dash/users/edit/${record._id}`}>
          <i className="icofont-edit icofont"></i>
        </Link>
        <Link to={`/dash/users/delete/${record._id}`}>
          <i className="icofont-trash icofont"></i>
        </Link>
      </Space>
    )
  }
]

export const UsersList: React.FC = () => {
  const navigate = useNavigate()
  useTitle('User List | Shopper Seguro')
  const { data: users, isLoading } = useGetUsersQuery({})
  const handleAddClient = () => navigate('/dash/users/add')

  const header = (
    <PageHeader
      title="Users list"
      subTitle=""
      onBack={() => navigate('/dash')}
      extra={[
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined style={{ fontSize: '1.5em' }} />}
          onClick={handleAddClient}
          size={'large'}
        >
          Add User
        </Button>
      ]}
    ></PageHeader>
  )

  const table = isLoading ? 
    <Skeleton avatar paragraph={{ rows: 4 }} />: 
    <Table columns={columns} dataSource={users} />

  const content = (
    <div className='grid'>
      {header}
      {table}
    </div>
  )

  return content
}
