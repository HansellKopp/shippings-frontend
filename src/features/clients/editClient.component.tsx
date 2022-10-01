import {
  Button,
  Checkbox,
  div,
  Form,
  Input,
  notification,
  PageHeader,
  Skeleton
} from 'antd'
import useTitle from 'hooks/useTitle'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ruleRequired } from 'utils'
import {
  Client,
  useGetClientQuery,
  useUpdateClientMutation
} from './clientsApiSlice'

export const EditClient = () => {
  useTitle('Edit Client | Shopper Seguro')
  let content = <div />
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const { id } = params
  const [editClient] = useUpdateClientMutation()
  const { data: client, isLoading, isError } = useGetClientQuery(id || '')

  useEffect((): void => {
    if (client) {
      form.setFieldsValue({
        name: client.name,
        email: client.email,
        phone: client.phone,
        street: client.street,
        city: client.city,
        state: client.state,
        zipcode: client.zipcode,
        country: client.country,
        active: client.active
      })
    }
  }, [client])

  const handleSubmit = (values: Client) => {
    if (client) {
      editClient({ ...values, _id: id })
        .then(() => {
          notification.success({
            message: 'Client updated',
            description: 'Client updated successfully'
          })
          form.resetFields()
          navigate('/dash/clients')
        })
        .catch(() => {})
    }
  }

  if (isLoading) {
    content = <Skeleton active />
  }

  if (isError) {
    navigate('/dash/clients')
    notification['error']({
      message: 'Error',
      description: 'Invalid client'
    })
  }

  content = (
    <div className="max-w-screen-lg m-auto">
      <PageHeader
        title="Edit Client"
        subTitle=""
        onBack={() => window.history.back()}
      />
      <Form layout={'vertical'} form={form} onFinish={handleSubmit}>
        <div className="grid grid-cols-4 gap-2">
          <div className="col-span-4 sm:col-span-2">
            <Form.Item
              label="Name"
              name={'name'}
              rules={[ruleRequired('Name')]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </div>
          <div className="col-span-4 sm:col-span-1">
            <Form.Item
              label="Email"
              name={'email'}
              rules={[ruleRequired('Email')]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </div>
          <div className="col-span-4 sm:col-span-1">
            <Form.Item label="Phone" name={'phone'}>
              <Input placeholder="Phone" />
            </Form.Item>
          </div>
          <div className="col-span-4 sm:col-span-2">
            <Form.Item label="Street" name={'street'}>
              <Input placeholder="Street" />
            </Form.Item>
          </div>
          <div className="col-span-4 sm:col-span-1">
            <Form.Item label="City" name={'city'}>
              <Input placeholder="City" />
            </Form.Item>
          </div>
          <div className="col-span-4 sm:col-span-1">
            <Form.Item label="Zip" name={'zipcode'}>
              <Input placeholder="Zip" />
            </Form.Item>
          </div>
          <div className="col-span-4 sm:col-span-1">
            <Form.Item label="State" name={'state'}>
              <Input placeholder="State" />
            </Form.Item>
          </div>
          <div className="col-span-4 sm:col-span-1">
            <Form.Item label="Country" name={'country'}>
              <Input placeholder="Country" />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Is Active"
              name={'active'}
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </div>
        </div>
        <div>
          <div className="grid-cols-4 sm:grid-cols-1">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  )
  return content
}
