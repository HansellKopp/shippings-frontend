import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, notification, PageHeader, Skeleton, Tag, Typography } from "antd";
import { useDeleteUserMutation, useGetUserQuery } from "./usersApiSlice";
import useTitle from "hooks/useTitle";

const { Title, Paragraph } = Typography;

export const DeleteUser: React.FC = () => {
    let content = <div/>
    useTitle('Delete user | Shopper Seguro')
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const { id } = params;
    const [ deleteUser ] = useDeleteUserMutation();
    const { data: user, isLoading, isError } = useGetUserQuery(id||'');

    const handleDelete = () => {
        if(user) {
            deleteUser({ _id: id })
                .then(() => {
                    notification.success({
                        message: "User deleted",
                        description: "User has been deleted successfully"
                    });
                    navigate("/dash/users");
                })
                .catch(error => {
                    notification.error({
                        message: "Error",
                        description: "Unable to delete user",
                    });
                })
        }
    }

    if( isLoading ) {
        content = <Skeleton active />
    }

    if( isError ) {
        navigate('/dash/users');
        notification['error']({
            message: 'Error',
            description: 'Invalid user'
        });
    }

    if( user ) {
        content = 
        <div>
            <PageHeader title="Delete User" subTitle=""  onBack={() => window.history.back()}
            extra={[
                <Button key="1" type="primary" danger onClick={handleDelete}>Delete</Button>,
              ]} 
            />
            <Card title={user.username}>
            <Typography>
                <Title level={3}>Username</Title>
                <Paragraph>{user.username}</Paragraph>
                <Title level={3}>Roles</Title>
                <Paragraph>{user.roles.map(role => <Tag key={role}>{role}</Tag>)}</Paragraph>
            </Typography>
            </Card>
        </div>
    }
    
    return content;
} 