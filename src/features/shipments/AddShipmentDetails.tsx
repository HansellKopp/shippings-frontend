import { AutoComplete, Button, Card, DatePicker, Form, Input, PageHeader } from "antd"
import form from "antd/lib/form"
import Typography from "antd/lib/typography"
import Paragraph from "antd/lib/typography/Paragraph"
import useTitle from "hooks/useTitle"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ruleRequired } from "utils"
import { selectClient, selectShipment, setCurrentPage } from "./shipmentSlice"

export const AddShipmentDetails = () => {
    const client = useSelector(selectClient)
    const shipment = useSelector(selectShipment)
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useTitle('Add Shipment details| Shopper Seguro')

    const handleSubmit = () => {
        dispatch(setCurrentPage(3))
    }
    const handlePrevious = () => {
        dispatch(setCurrentPage(1))
    }

    const headerCard = 
        <div className="flex">
            <Card title={client.name}>
                <Typography>
                    <Paragraph>{client.street}, {client.city}</Paragraph>
                    <Paragraph>{client.state}, {client.zipcode} - {client.country}</Paragraph>
                    <Paragraph>{client.email}</Paragraph>
                    <Paragraph>{client.phone}</Paragraph>
                </Typography>
            </Card>
            <Card title={"Shipment Info"}>
                <Paragraph><div className="flex justify-between"><div>Account #:</div>{shipment.orderNumber}<div>Shipment Number:</div>{shipment.shipmentNumber}</div></Paragraph>
                <Paragraph><div className="flex justify-between"><div>Date #:</div>{shipment.date}<div>Expedient:</div>{shipment.expedient}</div></Paragraph>
            </Card>
        </div>
    let content = 
    <div className="max-w-screen-lg m-auto">
    <PageHeader title="Add Shipment" subTitle=""  onBack={() => window.history.back()} />
    <Form
        layout={'vertical'}
        form={form}
        onFinish={handleSubmit}
    >
     <div className="flex flex-col gap-2">
        <div className="col-span-4 sm:col-span-2">
            {headerCard}
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
    <div className='flex justify-between'>
        <Form.Item> 
            <Button type="primary" onClick={handlePrevious}>Previous</Button>
        </Form.Item>
        <Form.Item> 
            <Button type="primary" htmlType='submit'>Next</Button>
        </Form.Item>
    </div>
    </Form>
</div>

  return content
}