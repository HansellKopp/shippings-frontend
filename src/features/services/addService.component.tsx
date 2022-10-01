import { Button, Checkbox, Col, Form, Input, InputNumber, notification, PageHeader, Row, Switch } from 'antd';
import useTitle from 'hooks/useTitle';
import { useNavigate } from 'react-router-dom';
import { ruleRequired } from 'utils';
import { Service, useAddServiceMutation } from './servicesApiSlice';

export const AddService = () => {
    useTitle('Add service | Shopper Seguro')
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const [ addService ] = useAddServiceMutation()

    const handleSubmit  = (values: Service) => {
        addService(values)
            .then(() => {
                notification.success({
                    message: 'Service added',
                    description: 'Service added successfully'
                })
                form.resetFields()
                navigate("/dash/services");
            })
            .catch(() => {})
    }
    
    const content = 
        <div className="max-w-screen-lg m-auto">
        <PageHeader title="Edit Service" subTitle=""  onBack={() => window.history.back()} />
        <Form
            layout={'vertical'}
            form={form}
            onFinish={handleSubmit}
        >
        <div className="grid grid-cols-4 gap-2">
            <div className="col-span-4 sm:col-span-2">
                <Form.Item label="Code" name={"code"} rules={[ruleRequired('code')]}>
                    <Input placeholder='Code' />
                </Form.Item>
            </div>
            <div className="col-span-4 sm:col-span-2">
                <Form.Item label="Description" name={"description"} rules={[ruleRequired('Description')]}>
                    <Input placeholder='Description' />
                </Form.Item>
            </div>
            <div className="col-span-4 sm:col-span-1">
                <Form.Item label="Price" name={"price"}>
                    <InputNumber/>
                </Form.Item>
            </div>
            <div className="col-span-4 sm:col-span-1">
                <Form.Item label="Price per volume" name={"pricePerVolume"} valuePropName="checked">
                    <Checkbox/>
                </Form.Item>
            </div>
        </div>
        <div>
            <div className="col-span-4 sm:col-span-1">
                <Form.Item> 
                    <Button type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>
            </div>
        </div>
        </Form>
    </div>
    return content
}