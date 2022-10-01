import {
    Button,
    Checkbox,
    Form,
    Input,
    notification,
    PageHeader,
    Select,
    Skeleton
  } from 'antd'
import useTitle from 'hooks/useTitle'
  import { useEffect } from 'react'
  import { useNavigate, useParams } from 'react-router-dom'
  import { ruleRequired } from 'utils'
  import {
    User,
    useGetUserQuery,
    useUpdateUserMutation
  } from './usersApiSlice'
  const { Option } = Select;
  
  export const EditUser = () => {
    let content = <div />
    const [form] = Form.useForm()
    const navigate = useNavigate()
    useTitle('Edit user | Shopper Seguro')
    const params = useParams<{ id: string }>()
    const { id } = params
    const [editUser] = useUpdateUserMutation()
    const { data: user, isLoading, isError } = useGetUserQuery(id || '')
  
    useEffect((): void => {
      if (user) {
        form.setFieldsValue({
          username: user.username,
          roles: user.roles,
          active: user.active
        })
      }
    }, [user])
  
    const handleSubmit = (values: User) => {
      if (user) {
        editUser({ ...values, _id: id })
          .then(() => {
            notification.success({
              message: 'User updated',
              description: 'User updated successfully'
            })
            form.resetFields()
            navigate('/dash/users')
          })
          .catch(() => {})
      }
    }
  
    if (isLoading) {
      content = <Skeleton active />
    }
  
    if (isError) {
      navigate('/dash/users')
      notification['error']({
        message: 'Error',
        description: 'Invalid user'
      })
    }
  
    content = (
      <div className="max-w-screen-lg m-auto">
        <PageHeader
          title="Edit User"
          subTitle=""
          onBack={() => window.history.back()}
        />
        <Form layout={'vertical'} form={form} onFinish={handleSubmit}>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-4 sm:col-span-2">
              <Form.Item
                label="Username"
                name={'username'}
                rules={[ruleRequired('username')]}
              >
                <Input placeholder="Username" />
              </Form.Item>
            </div>

            <div className="col-span-4 sm:col-span-2">
                    <Form.Item label="Roles" name={"roles"} rules={[ruleRequired('Roles')]}>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select user roles"
                            defaultValue={[]}
                            >
                            {[
                                <Option key={"Employee"}>Employee</Option>,
                                <Option key={"Admin"}>Admin</Option>
                            ]}
                        </Select>
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
  