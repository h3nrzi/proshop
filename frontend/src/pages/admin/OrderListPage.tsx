import _ from "lodash";
import { Button, Table } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../api/orders-api";
import Loader from "../../components/common/Loader";
import Message from "../../components/common/Message";
import getErrorMessage from "../../utils/getErrorMessage";

const OrderListPage = () => {
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useGetAllOrdersQuery();

  if (ordersLoading) return <Loader />;
  if (ordersError) return <Message variant="danger">{getErrorMessage(ordersError)}</Message>;

  return (
    <>
      <h1>Orders</h1>
      {
        <Table responsive="lg" className="table-sm mt-3 text-nowrap">
          <thead>
            <tr>
              <th className="px-5 px-lg-0">ID</th>
              <th className="px-5 px-lg-0">USER</th>
              <th className="px-5 px-lg-0">DATE</th>
              <th className="px-5 px-lg-0">TOTAL PRICE</th>
              <th className="px-5 px-lg-0">PAID</th>
              <th className="px-5 px-lg-0">DELIVERED</th>
              <th className="px-5 px-lg-0"></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link to={`/order/${order._id}`}>{_.takeRight(order._id.split(""), 4).join("")}</Link>
                  </td>
                  <td>{order.user?.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <span className=" text-success">{order.paidAt?.substring(0, 10)}</span>
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <span className=" text-success">{order.deliveredAt?.substring(0, 10)}</span>
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </td>
                  <td>
                    {order.isPaid && order.isDelivered ? (
                      <FaCheck color="green" />
                    ) : (
                      <Link to={`/order/${order._id}`}>
                        <Button size="sm" as="span" variant="secondary" className="text-white">
                          Details
                        </Button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      }
    </>
  );
};

export default OrderListPage;
