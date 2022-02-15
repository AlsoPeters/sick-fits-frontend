import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import ErrorMessage from '../../components/ErrorMessage';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function SingleOrderPage({ query }) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <ErrorMessage error={error} />;
  const { order } = data;

  return (
    <div className='flex justify-center'>
      <div className='w-2/3 m-4 my-4 border-4 rounded-md border-tokyo-term-magenta'>
        <Head>
          <title>Sick Fits - {order.id}</title>
        </Head>

        <div className='w-full px-4 py-2 border-b-4 border-tokyo-term-magenta'>
          <p className=''>
            <span className='text-lg font-bold'>Order Id: </span>
            <span>{order.id}</span>
          </p>
          <p className=''>
            <span className='text-lg font-bold'>Charge: </span>
            <span>{order.charge}</span>
          </p>
          <p className=''>
            <span className='text-lg font-bold'>Order Total: </span>
            <span>{formatMoney(order.total)}</span>
          </p>
          <p className=''>
            <span className='text-lg font-bold'>Item Count: </span>
            <span>{order.items.length}</span>
          </p>
        </div>

        <div className='content-center mx-4 my-4'>
          {order.items.map((item) => (
            <div className='flex my-4' key={item.id}>
              <img
                className='object-cover w-40 h-40'
                src={item.photo.image.publicUrlTransformed}
                alt={item.title}
              />
              <div className='flex flex-col justify-center mx-4'>
                <h2 className='text-xl font-bold'>{item.name}</h2>
                <p>Qty: {item.quantity}</p>
                <p>Each: {formatMoney(item.price)}</p>
                <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
