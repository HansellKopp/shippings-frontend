import { Button, Form, Input, notification, PageHeader } from 'antd';
import useTitle from 'hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { ruleRequired } from 'utils';
import { Client, useAddClientMutation } from './clientsApiSlice';

export const AddClient = () => {
    useTitle('Add Client | Shopper Seguro')
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const [ addClient ] = useAddClientMutation()

    const handleSubmit  = (values: Client) => {
        addClient(values)
            .then(() => {
                notification.success({
                    message: 'Client added',
                    description: 'Client added successfully'
                })
                form.resetFields()
                navigate(-1);
            })
            .catch(() => {})
    }
    
    const content = 
        <div className="max-w-screen-lg m-auto">
            <PageHeader title="Add Client" subTitle=""  onBack={() => window.history.back()} />
            <Form
                layout={'vertical'}
                form={form}
                onFinish={handleSubmit}
            >
             <div className="grid grid-cols-4 gap-2">
             <div className="col-span-4 sm:col-span-2">
                <Form.Item label="Name" name={"name"} rules={[ruleRequired('Name')]}>
                    <Input placeholder='Name' />
                </Form.Item>
            </div>
            <div className="col-span-4 sm:col-span-1">
                <Form.Item label="Email" name={"email"} rules={[ruleRequired('Email')]}>
                    <Input placeholder='Email' />
                </Form.Item>
            </div>
            <div className="col-span-4 sm:col-span-1">
                <Form.Item label="Phone" name={"phone"}>
                    <Input placeholder='Phone' />
                </Form.Item>
            </div>

            <div className="col-span-4 sm:col-span-2">
                <Form.Item label="Street" name={"street"}>
                    <Input placeholder='Street' />
                </Form.Item>
            </div>

            <div className="col-span-4 sm:col-span-1">
                <Form.Item label="City" name={"city"}>
                    <Input placeholder='City' />
                </Form.Item>
            </div>

            <div className="col-span-4 sm:col-span-1">
                <Form.Item label="Zip" name={"zip"}>
                    <Input placeholder='Zip' />
                </Form.Item>
            </div>

            <div className="col-span-4 sm:col-span-1">
                <Form.Item label="State" name={"state"}>
                    <Input placeholder='State' />
                </Form.Item>
            </div>

            <div className="col-span-4 sm:col-span-1">
                <Form.Item label="Country" name={"country"}>
                    <Input placeholder='Country' />
                </Form.Item>
            </div>
            </div>
            <div>
                <div className="grid-cols-4 sm:grid-cols-1">
                    <Form.Item> 
                        <Button type="primary" htmlType='submit'>Submit</Button>
                    </Form.Item>
                </div>
            </div>
            </Form>
        </div>
    return content
}