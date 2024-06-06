import React, { FC, useState } from 'react';
import { Card, Modal, Switch } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Coffee } from '../../types';
import { useMutation } from '@apollo/client';
import { CUSTOMIZE_COFFEE_DOCUMENT } from '../../graphql';
import { useNotification } from '../Layout';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import Image from "next/image"

interface Props {
    coffee?: Coffee;
    isOpened: boolean;
    closeModal: () => void;
}

const CustomCoffeeModal: FC<Props> = ({ coffee, isOpened, closeModal }) => {
  const notify = useNotification();
  const [loading, setIsLoading] = useState(false);

  const [ activeIngredients, setActiveIngredients ] = useState<string[]>(coffee?.ingredients || []);

  const [orderCoffee] = useMutation(CUSTOMIZE_COFFEE_DOCUMENT, {
    onCompleted: (data: { customizeCoffee: Coffee}) => {
      setIsLoading(false);
      notify?.open({
        message: `One cup of ${data?.customizeCoffee?.title} coming right up!`,
        duration: 15,
      });
      closeModal();
    },
    onError: (error) => {
      console.log('Error', error);
      setIsLoading(false);
      notify?.open({
        message: 'Something went wrong!',
        description: 'Please try again.',
        duration: 15,
      });
      closeModal();
    }
  });

  const handleOnSubmit = () => {
    setIsLoading(true);
    orderCoffee({ variables: { 
            coffee: {
                ...coffee, 
                ingredients: activeIngredients
            }
        } 
    });
    closeModal();
  };

    const handleIngredientChange = (ingredient: string) => {
        console.log("test", event)
        setActiveIngredients((prev) => {
            if (prev.includes(ingredient)) {
                return prev.filter((item) => item !== ingredient);
            }
            return [...prev, ingredient];
        });
    };

  return (
    <Modal
      title={`Customize your ${coffee?.title}`}
      open={isOpened}
      onOk={handleOnSubmit}
      confirmLoading={loading}
      onCancel={closeModal}
    >
      <Card
        cover={<img alt={`Cover for ${coffee?.title}`} src={coffee?.image ?? ""} />}
      >
        <Meta title={coffee?.title} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          {coffee?.ingredients.map((ingredient, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onClick={(event) => handleIngredientChange(ingredient)}
              />
              <span style={{ marginLeft: '10px' }}>{ingredient}</span>
            </div>
          ))}
        </div>
      </Card>
    </Modal>
  );
};

export default CustomCoffeeModal;
