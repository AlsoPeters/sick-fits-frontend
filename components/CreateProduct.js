import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from '../components/ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Router from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And what types are they?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Nice shoes',
    price: 1234,
    description: 'These are the best shoes!',
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  console.log(createProduct);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          // Submit the inputfields to the backend:
          const res = await createProduct();
          clearForm();
          // Go to that products page
          Router.push({
            pathname: `/product/${res.data.createProduct.id}`,
          });
        }}
      >
        <DisplayError error={error} />
        <fieldset disabled={loading}>
          <label htmlFor="image">
            Image
            <input
              required
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            price
            <input
              type="number"
              id="name"
              name="price"
              placeholder="Price"
              value={inputs.price}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={inputs.description}
              onChange={handleChange}
            />
          </label>

          <button
            // TODO: add this button style as a default
            className="px-2 py-1 m-2 border-2 rounded-md bg-tokyo-term-black border-tokyo-term-magenta"
            type="submit"
          >
            + Add Product
          </button>
        </fieldset>
      </form>
    </div>
  );
}
