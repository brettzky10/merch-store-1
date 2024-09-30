import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux'
import { Product } from '@/lib/types/Product';
import { StateProps } from '@/lib/types/Product';
//import { RxCross2 } from 'react-icons/rx';
//import { FaPlus, FaMinus } from 'react-icons/fa'
import { deleteProduct, increaseQuantity, decreaseQuantity } from '@/lib/redux/shoppingSlice';
//import { toast } from 'react-hot-toast';
import FormattedPrice from './FormattedPrice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Minus, Plus, X } from 'lucide-react';

const CartItem = () => {
  const { productData } = useSelector((state: StateProps) => state.shopping);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <div>
          {productData?.map((item: Product) => (
            <div className='flex flex-row gap-4 pb-3' key={item.id}>
              <div className='w-1/4 h-auto flex justify-center bg-gray-300 items-center'>
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail}
                    alt="product image"
                    height={2000}
                    width={2000}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className='w-3/4 flex flex-col items-start justify-center gap-4'>
                <div>
                  <p className='text-small font-bold mb-6'>{item?.name}</p>
                </div>
                <div className='flex flex-col items-start justify-center'>
                  <p className='flex items-center justify-center font-bold'>{item?.size}</p>
                  <p className='flex items-center justify-center'>
                    <FormattedPrice amount={Number(item?.price) * item?.quantity} />
                  </p>
                  <div className='flex justify-center items-center'>
                    <div>
                      <button onClick={() => dispatch(decreaseQuantity(item))} className='cursor-pointer'>
                        <Minus />
                      </button>
                    </div>
                    <div>
                      <span className="text-small font-semibold px-2">{item?.quantity}</span>
                    </div>
                    <div>
                      <button onClick={() => dispatch(increaseQuantity(item))} className='cursor-pointer'>
                        <Plus />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='pt-3'>
                  <button
                    onClick={() =>
                      dispatch(deleteProduct(item?.size)) &&
                      toast.success(`Product removed successfully`)}
                    className="flex flex-row justify-center items-center"
                  >
                    <X /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CartItem;
