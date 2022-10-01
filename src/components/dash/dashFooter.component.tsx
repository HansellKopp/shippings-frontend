import { Layout } from 'antd'
import { useAuth } from 'hooks/useAuth';
const {  Footer } = Layout;

export const DashFooter = () => {
    const { username } = useAuth()
    const content = (
        <Footer className='flex justify-between'>
            <div>
                Current user: {username}
            </div>
            <div className="flex-1 text-center">Made with love in Berlin</div>
        </Footer>
    )
    return content
}