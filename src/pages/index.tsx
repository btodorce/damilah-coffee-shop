import { useMutation, useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import Image from 'next/image'
import { FC, useState } from 'react';
import { ALL_HOTS_DOCUMENT, ORDER_COFFEE_DOCUMENT } from '../graphql';
import { ALL_HOTS, type Coffee } from '../types';

const Layout = dynamic(() => import('../components/Layout'), {
  ssr: false,
})


const CoffeeProduct = dynamic(() => import('../components/CoffeeProduct'), {
  ssr: false,
})

const ProductModal = dynamic(() => import('../components/ProductModal'), {
  ssr: false,
})


const CustomCoffeeModal = dynamic(() => import('../components/CustomCoffeeModal/index'), {
  ssr: false,
})

const Index: FC = () => {

  const [ showCreateNewOrderModal, setShowCreateNewOrderModal ] = useState(false);
  const [ showCustomCoffeeModal, setShowCustomCoffeeModal ] = useState(false);
  const [coffee, setCoffee] = useState<Coffee>();

  const { data, loading, error } = useQuery<ALL_HOTS>(ALL_HOTS_DOCUMENT);

  const handleAddToCard = (coffee: Coffee) => {
    setShowCreateNewOrderModal(true);
    setCoffee(coffee);
    console.log('Add to cart', coffee);
  }

  const handleEdit = (coffee: Coffee) => {
    console.log('Edit', coffee);
    setShowCustomCoffeeModal(true);
    setCoffee(coffee);
  }

  const handleCloseModal = () => {
    setShowCreateNewOrderModal(false);
    setShowCustomCoffeeModal(false);
  }

  return (
    <main>
      <Layout>
        <div className='bg-background-light dark:bg-background-dark h-screen w-full'>
          <div className='flex justify-center items-center h-fit'>
            <div className="flex flex-col items-center">
              <Image alt="daimlah logo" src="/logo.webp" width={400} height={400}/>
              <div className='flex flex-wrap justify-center gap-4 mt-4'>
                {showCreateNewOrderModal && (<ProductModal coffee={coffee} isOpened={showCreateNewOrderModal} closeModal={handleCloseModal} />)}
                {showCustomCoffeeModal && (<CustomCoffeeModal coffee={coffee} isOpened={showCustomCoffeeModal} closeModal={handleCloseModal} />)}

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
