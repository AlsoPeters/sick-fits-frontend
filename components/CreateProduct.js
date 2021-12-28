import useForm from "../lib/useForm";

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: "",
    name: "Nice shoes",
    price: 1234,
    description: "These are the best shoes!",
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(inputs);
        }}
      >
        <fieldset>
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
            className="py-1 px-2 m-2 rounded-md border-2 bg-tokyo-term-black border-tokyo-term-magenta"
            type="submit"
          >
            + Add Product
          </button>
        </fieldset>
      </form>
    </div>
  );
}
