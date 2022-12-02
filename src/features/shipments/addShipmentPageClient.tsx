import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DefaultOptionType } from 'antd/lib/select';
import { AutoComplete, Button, Card, DatePicker, Form, Input, notification, PageHeader, Typography } from 'antd';
import { Shipment, useAddShipmentMutation } from './shipmentsApiSlice';
import { Client, useGetClientsQuery } from 'features/clients/clientsApiSlice';
import { ruleRequired } from 'utils';
import useTitle from 'hooks/useTitle';
import Paragraph from 'antd/lib/typography/Paragraph';
import { setCurrentPage, setShipment } from './shipmentSlice';
import { useDispatch } from 'react-redux';

export const AddShipmentClient = () => {
    useTitle('Add Shipment | Shopper Seguro')
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {data: clients } = useGetClientsQuery({})
    const [ addShipment ] = useAddShipmentMutation()
    const [client, setClient] = useState<Client|null>(null)
    const [clientOptions, setClientOptions] = useState<DefaultOptionType[]>([])

    useEffect(() =>{
        if(clients) {
            const op = clients.map((item: Client)=> ({
                value: item.name,
                id: item._id
            }))
            setClientOptions(op as DefaultOptionType[])
        }
    },[clients])

    const onSelect = (_a,b) => {
        if(b) {
            const client = clients.find((item: Client)=> item._id===b.id)
            if(client) setClient(client)
        }
    }

    const handleSubmit  = (values: Shipment) => {
        if(values) {
            dispatch(setShipment(values))
            dispatch(setCurrentPage(1))
        }
    }
    
    const save = () => {
        addShipment(values)
        .then(() => {
            notification.success({
                message: 'Shipment added',
                description: 'Shipment added successfully'
            })
            form.resetFields()
            navigate("/dash/shipments");
        })
        .catch(() => {})
    }

    let clientCard = <Link to={'/dash/clients/add'}><div>Add Client</div></Link>

    if(client) {
        clientCard =
        <Card title={client.name}>
            <Typography>
                <Paragraph>{client.street}, {client.city}</Paragraph>
                <Paragraph>{client.state}, {client.zipcode} - {client.country}</Paragraph>
                <Paragraph>{client.email}</Paragraph>
                <Paragraph>{client.phone}</Paragraph>
            </Typography>
        </Card>
    }

    const content = 
        <div className="max-w-screen-lg m-auto">
            <PageHeader title="Add Shipment" subTitle=""  onBack={() => window.history.back()} />
            <Form
                layout={'vertical'}
                form={form}
                onFinish={handleSubmit}
            >
             <div className="grid grid-cols-4 gap-2">
                <div className="col-span-4 sm:col-span-2">
                    <Form.Item label="Name" name={"name"} rules={[ruleRequired('Name')]}>
                        <AutoComplete
                            onSelect={onSelect}
                            options={clientOptions}
                            filterOption={(inputValue, option) =>
                                option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            >
                            <Input.Search size="large" placeholder="input here" enterButton />
                        </AutoComplete>
                    </Form.Item>
                    {clientCard}
                </div>
                <div className="col-span-4 sm:col-span-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2 sm:col-span-1">
                            <Form.Item label="Account Number" name={"accountNumber"} rules={[ruleRequired('accountNumber')]}>
                                <Input placeholder='Email' />
                            </Form.Item>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Form.Item label="Shipment Number" name={"shipmentNumber"}>
                                <Input placeholder='ex: A-11814' />
                            </Form.Item>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Form.Item label="Date" name={"date"}>
                                <DatePicker  />
                            </Form.Item>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Form.Item label="Expedient" name={"expedient"}>
                                <Input placeholder='' />
                            </Form.Item>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Form.Item label="Due date" name={"dueDate"}>
                                <DatePicker />
                            </Form.Item>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Form.Item label="Referenc" name={"referenc"}>
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Form.Item label="Pay method" name={"payMethod"}>
                                <Input placeholder='ex: cash' />
                            </Form.Item>
                        </div>
                        <div className="col-span-1 sm:col-span-1">
                            <Form.Item label="Order Nr." name={"orderNumber"}>
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end'>
                <Form.Item> 
                    <Button type="primary" htmlType='submit'>Next</Button>
                </Form.Item>
            </div>
            </Form>
        </div>


    return content
}