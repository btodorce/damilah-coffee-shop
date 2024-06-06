"use client"
import { useMutation, useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import Image from 'next/image'
import { FC, useState } from 'react';
import { ALL_HOTS_DOCUMENT, ORDER_COFFEE_DOCUMENT } from '../graphql';
import { ALL_HOTS, type Coffee } from '../types';
import { notification } from 'antd';

const Layout = dynamic(() => import('../components/Layout'), {
  ssr: false,
})


const CoffeeProduct = dynamic(() => import('../components/CoffeeProduct'), {
  ssr: false,
})

const ProductModal = dynamic(() => import('../components/Modal'), {
  ssr: false,
})


const Index: FC = () => {

  const [ showModal, setShowModal ] = useState(false);
  const [coffee, setCoffee] = useState<Coffee>();
  const [api, contextHolder] = notification.useNotification();

  const { data, loading, error } = useQuery<ALL_HOTS>(ALL_HOTS_DOCUMENT);
  const [ orderCoffee ] = useMutation(ORDER_COFFEE_DOCUMENT, {
    onCompleted: (data ) => {
      console.log('Order completed', data.orderCoffee.id);
      setShowModal(false);
      api.open({
        message: 'Hey you ordered a coffee!',
        description:
          `One ${name} is on the way!`,
        duration: 15,
      });
      
    },
    onError: (error) => {
      console.log('Error', error);
      setShowModal(false);
    }
  });

  const handleAddToCard = (coffee: Coffee) => {
    setShowModal(true);
    setCoffee(coffee);
    console.log('Add to cart', coffee);
  }

  const handleEdit = (coffee: Coffee) => {
    console.log('Edit', coffee);
  }

  const handleOnSubmit = () => {
    console.log('Submit');
    orderCoffee({
      variables: {
        coffee: {
          id: coffee?.id,
          name: coffee?.title
        }
      }
    })
    setShowModal(false);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <main>
      {contextHolder}
      <Layout>
        <div className='bg-background-light dark:bg-background-dark h-screen w-full'>
          <div className='flex justify-center items-center h-fit'>
            <div className="flex flex-col items-center">
              <Image alt="daimlah logo" src="/logo.webp" width={400} height={400}/>
              <div className='flex flex-wrap justify-center gap-4 mt-4'>
                {showModal && (<ProductModal coffee={coffee} isOpened={showModal} handleOnSubmit={handleOnSubmit} handleCloseModal={handleCloseModal} />)}
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && data.allHots.map((hot) => (
                    <CoffeeProduct
                      onAddToCart={handleAddToCard}
                      onEdit={handleEdit}
                      key={hot.id}
                      {...hot} 
                    />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
}

export default Index;
