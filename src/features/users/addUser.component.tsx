import { Button, Form, Input, notification, PageHeader, Select } from 'antd';
import useTitle from 'hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { ruleRequired } from 'utils';
import { User, useAddUserMutation } from './usersApiSlice';
const { Option } = Select;

export const AddUser = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate();
    useTitle('Add user | Shopper Seguro')
    const [addUser] = useAddUserMutation()

    const handleSubmit  = (values: User) => {
        addUser(values)
            .then(() => {
                notification.success({
                    message: 'User added',
                    description: 'User added successfully'
                })
                form.resetFields()
                navigate("/dash/users");
            })
            .catch(() => {})
    }

    const content = 
        <div className="max-w-screen-lg m-auto">
            <PageHeader title="Add User" subTitle=""  onBack={() => window.history.back()} />
            <Form
                layout={'vertical'}
                form={form}
                initialValues={{}}
                onFinish={handleSubmit}
                autoComplete="off"
            >
             <div className="grid grid-cols-4 gap-2">
                <div className="col-span-4 sm:col-span-4">
                    <Form.Item label="Username" name={"username"} rules={[ruleRequired('Username')]}>
                        <Input placeholder='Username' defaultValue={''} autoComplete="off" />
                    </Form.Item>
                </div>
                <div className="col-span-4 sm:col-span-2">
                    <Form.Item label="Password" name={"password"} rules={[ruleRequired('Password')]}>
                        <Input.Password placeholder='Password' />
                    </Form.Item>
                    <Form.Item 
                        label="Confirm Password"
                        name={"confirmPassword"}
                        dependencies={['password']}
                        rules={[
                            {
                            required: true,
                            message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                            }),
                        ]}
                    >
                        <Input.Password placeholder='Repeat Password'/>
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
            </div>
            <div>
                <div className="grid-cols-4 sm:grid-cols-1">
                    <Form.Item shouldUpdate>
                    {() => {
                        const errorsCount = form.getFieldsError().filter(({ errors }) => errors.length).length
                        const touched = form.isFieldsTouched(true)
                     return (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!!errorsCount}
                        >Submit</Button>
                    ) 
                    }}
                    </Form.Item>
                </div>
            </div>
            </Form>
        </div>
    return content
}