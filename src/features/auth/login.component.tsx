import { Card, Button, Form, Input, notification, Typography } from "antd"
import { Footer, Header } from "antd/lib/layout/layout";
import useTitle from "hooks/useTitle";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ruleRequired } from "utils";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

type LoginData = {
    username: string;  
    password: string;
}

export const Login = () => {
    useTitle('Login | Shopper Seguro')
    const errRef = useRef<HTMLParagraphElement|null>(null)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('')
    const [login, { isLoading }] = useLoginMutation()

    const handleSubmit = async (values: LoginData) => {
        try {
            const { accessToken } = await login(values).unwrap()
            dispatch(setCredentials({ accessToken }))
            notification.success({
                message: 'Logged',
                description: 'User logged successfully'
            })
            form.resetFields()
            navigate('/dash')
        } catch (err: any) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            if(errRef.current)
                errRef.current.focus();
        }
    }

    if (isLoading) return <p>Loading...</p>

    const errClass = errMsg ? "errmsg" : "offscreen"

    return (
    <div>
         <Header
            className="flex justify-between"
            style={{
                width: '100%',
                backgroundColor: '#f0f2f5'
            }}
            >
            <div className="flex gap-2 grow-0">
                <Link to="/">
                    <img alt="logo" src="src/public/bag.svg" style={{ height: 56 }} />
                </Link>
                <Typography.Title level={1}>Shopper seguro</Typography.Title>
            </div>
            </Header>
        <section className='flex h-full items-center justify-center  ml-4 mr-4' style={{ height: "calc(100vh - 8.5rem"}}>
            <Card 
                    className='w-full  sm:max-w-md' 
                    title="Login"
            >
                <Form
                    layout={'vertical'}
                    form={form}
                    onFinish={handleSubmit}
                >
                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2 sm:col-span-1">
                            <Form.Item label="username" name={"username"} rules={[ruleRequired('username')]}>
                                <Input placeholder='username' />
                            </Form.Item>
                        </div>
                        <div className="col-span-2 sm:col-span-1" >
                            <Form.Item label="Password" name={"password"}>
                                <Input.Password placeholder='Password' autoComplete="new-password"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="col-span-2 sm:col-span-1">
                            <Form.Item> 
                                <Button type="primary" htmlType='submit'>Submit</Button>
                            </Form.Item>
                        </div>
                    </div>
                    <div>
                        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                    </div>
                </Form> 
            </Card>
        </section>
        <Footer>
            <div className="flex-1 text-center">Made with love in Berlin</div>
        </Footer>
  </div>
)
}