import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    UpdateProduct(
      id: $id
      data: { id: $id, name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. We need to get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: id },
  });
  // 2. We need to get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      // TODO: pass in updates to product here!
    },
  });

  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;
  // 3. We need the form to handle the updates
  return (
    <div>
      <form>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          price
          <input
            type='number'
            id='name'
            name='price'
            placeholder='Price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <button
          className='px-2 py-1 m-2 border-2 rounded-md bg-tokyo-term-black border-tokyo-term-magenta'
          type='button'
          onClick={clearForm}
        >
          Clear Form
        </button>
        <button
          className='px-2 py-1 m-2 border-2 rounded-md bg-tokyo-term-black border-tokyo-term-magenta'
          type='button'
          onClick={resetForm}
        >
          Reset Form
        </button>
      </form>
    </div>
  );
}
