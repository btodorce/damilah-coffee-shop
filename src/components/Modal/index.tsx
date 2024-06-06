import React, { FC, useState } from 'react';
import { Button, Card, Modal } from 'antd';
import Meta from 'antd/es/card/Meta';
import { HotCoffeeProduct } from '../../types';


interface ProductModalProps {
    coffee?: HotCoffeeProduct;
    isOpened: boolean;
    handleOnSubmit: () => void;
    handleCloseModal: () => void;
}

const ProductModal: FC<ProductModalProps> = ({ coffee, isOpened, handleOnSubmit, handleCloseModal }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  return (
    <>
      <Modal
        title={coffee?.title}
        open={isOpened}
        onOk={handleOnSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCloseModal}
      >
        <Card
            cover={
                <img src={coffee?.image} />
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