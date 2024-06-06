import React, { createContext, FC, useContext } from 'react';
import { Card, Layout as AntLayout, notification } from 'antd';
import { NotificationInstance } from 'antd/es/notification/interface';

const { Content } = AntLayout;

interface P {
    children?: React.ReactNode;
}

const NotificationContext = createContext<NotificationInstance | null>(null);

export const useNotification = () => useContext(NotificationContext);


export const Layout: FC<P> = ({ children, ...rest }) => {
    const [api, contextHolder] = notification.useNotification();
    
    return (
        <NotificationContext.Provider value={api}>
            <AntLayout {...rest}>
                <AntLayout style={{ background: '#F7F7F9' }}>
                    <Content style={{ padding: '0 10em' }}>
                        {contextHolder}
                        <Card>
                            {children}
                        </Card>
                    </Content>
                </AntLayout>
            </AntLayout>
        </NotificationContext.Provider>
    );
}

export default Layout;
