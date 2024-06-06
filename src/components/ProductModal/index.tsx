import React, { FC, useState } from 'react';
import { Card, Modal } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Coffee } from '../../types';
import { useMutation } from '@apollo/client';
import { ORDER_COFFEE_DOCUMENT } from '../../graphql';
import { useNotification } from '../Layout';


interface P {
    coffee?: Coffee;
    isOpened: boolean;
    closeModal: () => void;
}

const ProductModal: FC<P> = ({ coffee, isOpened, closeModal }) => {
  const notify = useNotification();
  const [ loading, setIsLoading ] = useState(false);



  const [ orderCoffee ] = useMutation(ORDER_COFFEE_DOCUMENT, {
    onCompleted: (data: { orderCoffee: Coffee} ) => {
      setIsLoading(false);
      notify?.open({
        message: 'One cup of coffee coming right up!',
        description:
          `Enjoy you ${data.orderCoffee.title}!`,
        duration: 15,
      });
      closeModal()
    },
    onError: (error) => {
      console.log('Error', error);
      setIsLoading(false);
      notify?.open({
        message: 'Something went wrong while trying to get you that cup of coffee!',
        description:
          `Can u please try again?`,
        duration: 15,
      });
      closeModal()
    }
  });

  const handleOnSubmit = () => {
    console.log('Submit');
    setIsLoading(true);
    orderCoffee({
      variables: {
        coffee: {
          ...coffee
        }
      }
    })
    closeModal()
  }

  return (
    <>
      
      <Modal
        title={`Do you want to order ${coffee?.title}?`}
        open={isOpened}
        onOk={handleOnSubmit}
        confirmLoading={loading}
        onCancel={closeModal}
        loading={loading}
      > 
        <Card
            cover={
                <img src={coffee?.image} alt="coffee logo" />
            }
        >
            <Meta
                key={coffee?.id}
                title={coffee?.title}
                description={coffee?.description}
            />
        </Card>
      </Modal>
    </>
  );
};

export default ProductModal;