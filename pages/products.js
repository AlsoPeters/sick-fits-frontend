import Pagination from '../components/Pagination';
import Products from '../components/Products';

export default function ProductPage() {
  return (
    <div className='m-8'>
      <Pagination page={1} />
      <Products />
      <Pagination page={1} />
    </div>
  );
}
