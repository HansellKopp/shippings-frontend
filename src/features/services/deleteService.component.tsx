import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, notification, PageHeader, Skeleton, Typography } from "antd";
import { useDeleteServiceMutation, useGetServiceQuery } from "./servicesApiSlice";
import useTitle from "hooks/useTitle";
const { Title, Paragraph } = Typography;

export const DeleteService: React.FC = () => {
    let content = <div/>
    useTitle('Delete service | Shopper Seguro')
    const navigate = useNavigate();
    const params = useParams<{ userId: string }>();
    const { id } = params;
    const [ deleteService ] = useDeleteServiceMutation();
    const { data: service, isLoading, isError } = useGetServiceQuery(id||'');

    const handleDelete = () => {
        if(service) {
            deleteService(service)
                .then(() => {
                    notification.success({
                        message: "Service deleted",
                        description: "Service has been deleted successfully"
                    });
                    navigate("/dash/services");
                })
                .catch(error => {
                    notification.error({
                        message: "Error",
                        description: "Unable to delete service",
                    });
                })
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

    if( service ) {
        content = 
        <div>
            <PageHeader title="Delete Service" subTitle=""  onBack={() => window.history.back()}
            extra={[
                <Button key="1" type="primary" danger onClick={handleDelete}>Delete</Button>,
              ]} 
            />
            <Card title={service.description}>
            <Typography>
                <Title level={3}>Code</Title>
                <Paragraph>{service.code}</Paragraph>
                <Typography>
                <Title level={3}>Description</Title>
                <Paragraph>{service.descriptionl}</Paragraph>
                <Title level={3}>Address</Title>
                <Paragraph>{service.price}</Paragraph>
            </Typography>
            </Typography>
            </Card>
        </div>
    }
    
    return content;
} 