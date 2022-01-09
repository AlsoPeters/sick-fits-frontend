import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice shoes',
    price: 1234,
    description: 'These are the best shoes!',
  });

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
