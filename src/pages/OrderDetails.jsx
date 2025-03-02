import Layout from '../components/layout/Layout'
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosConfig';
import { useEffect, useState } from 'react';

function OrderDetails() {
    const {id} = useParams();
    const [orderProducts, setOrderProducts] = useState([]);
    const [order, setOrder] = useState({});

    useEffect(() => {
        getOrder();
        getOrderProducts();
    }, []);
    async function getOrderProducts(){
        var products = await axiosInstance.get(`/order/${id}/products`);
        setOrderProducts(products.data);
    }
    async function getOrder(){
        var order = await axiosInstance.get(`/order/${id}`);
        setOrder(order.data);
        console.log(order.data);
        
    }
  return (
    <Layout>
        <h1>Sifariş məlumatları</h1>
        <p>Sifariş kodu: {id}</p>
        <p>Sifariş tarixi: {order.opened}</p>
        <p>Sifariş bağlandı: {order.closed}</p>
        <p>Sifariş statusu: {order.status}</p>
        <p>Sifariş açan: {order.openedBy}</p>
        <p>Sifariş bağlayan: {order.closedBy}</p>
        <p>Sifariş depo: {order.warehouse}</p>
        <p>Sifariş məhsulları: {orderProducts.length}</p>
        <h2>Sifariş məhsulları</h2>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Məhsul</th>
                    <th>Miqdar</th>
                </tr>
            </thead>
            <tbody>
                {orderProducts.map((product, index) => (
                    <tr key={product.id}>
                        <td>{++index}</td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Layout>
  )
}

export default OrderDetails