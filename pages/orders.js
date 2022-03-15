import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import ErrorMessage from "../components/ErrorMessage";
import formatMoney from "../lib/formatMoney";
import Link from "next/link";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
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

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2 className="text-xl font-bold">You have {allOrders.length} orders.</h2>
      <div>
        {allOrders.map((order) => (
          <div className="m-4 font-bold border-2 rounded-sm w-max border-tokyo-term-magenta">
            <Link href={`/order/${order.id}`}>
              <a className="grid grid-rows-2">
                <div className="flex row-span-1 text-center">
                  <p className="p-2 m-2 w-28 bg-tokyo-term-black">
                    {countItemsInAnOrder(order)}{" "}
                    {countItemsInAnOrder(order) === 1 ? "Item" : "Items"}
                  </p>
                  <p className="p-2 m-2 w-28 bg-tokyo-term-black">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "Product" : "Products"}
                  </p>
                  <p className="p-2 m-2 w-28 bg-tokyo-term-black">
                    {formatMoney(order.total)}
                  </p>
                  <div className="flex row-end-2">
                    {order.items.map((item) => (
                      <img
                        className="w-20"
                        key={item.id}
                        src={item.photo?.image?.publicUrlTransformed}
                        alt={item.name}
                      />
                    ))}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
