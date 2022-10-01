import { Layout, Menu, Typography, Grid } from 'antd';
import { logOut } from 'features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMenuItem } from 'utils';
const { Header } = Layout;
const { useBreakpoint } = Grid;

export const DashHeader = (): JSX.Element => {
    const dispatch = useDispatch()
    const breakPoints = useBreakpoint()

    const handleMenuClick = (e: any) => {
        e.key === 'logout' ? dispatch(logOut({})) : null
    }
    
    const content = (
        <Header className="flex gap-2 justify-between items-center"
            style={{ 
                width: "100%",
                backgroundColor: "#f0f2f5", 
            }}
        >
            <div>
                <Link to={'/dash'} className='flex gap-2 grow-0 items-center justify-center p-2'>
                    <img alt="logo" src="src/public/bag.svg" style={{ height: 48}}/>
                    {!breakPoints.xs &&
                        <Typography.Title level={1} style={{ margin: 0}}>Shopper seguro</Typography.Title>
                    }
                </Link>
            </div>
            <div>
                <Menu
                    mode="horizontal"
                    items={[getMenuItem(<span className='m-2'>Logout</span>, 'logout',<i className="icofont-logout icofont-2x"></i>)]}
                    style={{
                        flexGrow: 1,
                        backgroundColor: "#f0f2f5", 
                    }}
                    onClick={handleMenuClick}
                    
                />
            </div>
        </Header>
    )

    return content
}