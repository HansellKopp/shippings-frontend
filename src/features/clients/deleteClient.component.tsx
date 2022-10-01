import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, notification, PageHeader, Skeleton, Typography } from "antd";
import { useDeleteClientMutation, useGetClientQuery } from "./clientsApiSlice";
import useTitle from "hooks/useTitle";

const { Title, Paragraph } = Typography;

export const DeleteClient: React.FC = () => {
    let content = <div/>
    useTitle('Delete Client | Shopper Seguro')
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const { id } = params;
    const [ deleteClient ] = useDeleteClientMutation();
    const { data: client, isLoading, isError } = useGetClientQuery(id||'');

    const handleDelete = () => {
        if(client) {
            deleteClient({ _id: id })
                .then(() => {
                    notification.success({
                        message: "Client deleted",
                        description: "Client has been deleted successfully"
                    });
                    navigate("/dash/clients");
                })
                .catch(error => {
                    notification.error({
                        message: "Error",
                        description: "Unable to delete client",
                    });
                })
        }
    }

    if( isLoading ) {
        content = <Skeleton active />
    }

    if( isError ) {
        navigate('/dash/clients');
        notification['error']({
            message: 'Error',
            description: 'Invalid client'
        });
    }

    if( client ) {
        content = 
        <div>
            <PageHeader title="Delete Client" subTitle=""  onBack={() => window.history.back()}
            extra={[
                <Button key="1" type="primary" danger onClick={handleDelete}>Delete</Button>,
              ]} 
            />
            <Card title={client.name}>
            <Typography>
                <Title level={3}>Email</Title>
                <Paragraph>{client.email}</Paragraph>
                <Title level={3}>Address</Title>
                <Paragraph>{client.street}, {client.city}</Paragraph>
                <Paragraph>{client.state}, {client.zipcode} - {client.country}</Paragraph>
                <Paragraph></Paragraph>
                <Title level={3}>Phone</Title>
                <Paragraph>{client.phone}</Paragraph>
            </Typography>
            </Card>
        </div>
    }
    
    return content;
} 