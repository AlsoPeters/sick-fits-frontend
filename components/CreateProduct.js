import useForm from "../lib/useForm";

export default function CreateProduct() {
  const { inputs, handleChange } = useForm({
    name: "Nice shoes",
    price: 1234,
    description: "These are the best shoes!",
  });

  return (
    <div>
      <form>
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
      </form>
    </div>
  );
}
