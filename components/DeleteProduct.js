import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  console.log("Running the update function after delete");
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id: id },
      update: update,
    }
  );
  return (
    <button
      disabled={loading}
      className="px-2 py-1 font-bold border-2 rounded-md bg-tokyo-term-black border-tokyo-term-magenta"
      type="button"
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          console.log("DELETING");
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
