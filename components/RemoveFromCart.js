import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
  });

  return (
    <button
      onClick={removeFromCart}
      disabled={loading}
      className='text-2xl hover:text-tokyo-term-red'
      type='button'
      title='Remove This Item From Cart'
    >
      &times;
    </button>
  );
}
