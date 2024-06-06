import { FC } from 'react';
import { Card, Layout as AntLayout } from 'antd'

const { Content } = AntLayout

interface LayoutProps {
    children?: React.ReactNode; 
}

export const Layout: FC<LayoutProps> = ({ children, ...rest }) => {
    return (
        <AntLayout {...rest}>
            <AntLayout style={{ background: '#F7F7F9' }}>
                <Content style={{ padding: '0 10em' }}>
                    <Card>
                        {children}
                    </Card>
                </Content>
            </AntLayout>
        </AntLayout>
    );
}

export default Layout;