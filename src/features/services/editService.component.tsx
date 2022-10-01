import { Button, Checkbox, Form, Input, InputNumber, notification, PageHeader, Skeleton } from 'antd';
import useTitle from 'hooks/useTitle';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ruleRequired } from 'utils';
import { Service, useGetServiceQuery, useUpdateServiceMutation } from './servicesApiSlice';

export const EditService = () => {
    let content = <div/>
    useTitle('Edit service | Shopper Seguro')
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const { id } = params;
    const [ editService ] = useUpdateServiceMutation()
    const { data: service, isLoading, isError } = useGetServiceQuery(id||'');

    useEffect((): void => {
        if(service) {
            form.setFieldsValue({
                code: service.code,
                description: service.description,
                pricePerVolume: service.pricePerVolume,
                price: service.price,
                active: service.active
            })
        }
    }, [service]);

    const handleSubmit  = (values: Service) => {
        if(service) {
            editService({...values, _id: id})
                .then(() => {
                    notification.success({
                        message: 'Service updated',
                        description: 'Service updated successfully'
                    })
                    form.resetFields()
                    navigate("/dash/services");
                })
                .catch(() => {})
        }
    }

    if( isLoading ) {
        content = <Skeleton active />
    }

    if( isError ) {
        navigate('/dash/services');
        notification['error']({
            message: 'Error',
            description: 'Invalid service'
        });
    }
    
    content = 
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
                <div className="col-span-4 sm:col-span-1">
                    <Form.Item label="Active" name={"active"} valuePropName="checked">
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