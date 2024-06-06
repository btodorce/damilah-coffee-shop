import { FC } from 'react';
import { EditOutlined, PlusOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Coffee } from '../../types';


const { Meta } = Card;

type CoffeeProductProps  = Coffee & {
    onAddToCart: (coffee: Coffee) => void;
    onEdit: (coffee: Coffee) => void;
}


export const CoffeeProduct: FC<CoffeeProductProps> = ({id, description, image, ingredients, title, onAddToCart, onEdit}) => {

    return (
        <Card
            style={{ width: 200 }}
            cover={
                <img src={image} />
            }
            actions={[
                <PlusOutlined key="add" onClick={() => onAddToCart({id, description, image, ingredients, title})} />,
                <EditOutlined key="edit" onClick={() => onEdit({id, description, image, ingredients, title})}/>,
            ]}
        >
            <Meta
                key={id}
                title={title}
                description={description}
            />
        </Card>
    )
}

export default CoffeeProduct;