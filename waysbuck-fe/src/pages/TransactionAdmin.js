import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import NavbarComponentsAdmin from "../Components/NavbarComponentsAdmin";
import { API } from "../config/api";

export default function TransactionAdmin() {
  document.title = "WaysBucks | Transactions ";

  const [transactions, setTransactions] = useState();

  const getTransactions = async () => {
    try {
      const response = await API.get("transactions");
      console.log(response.data.data);
      setTransactions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <Container>
        <div className="my-5 py-5">
          <h2 className="text-primary-color fw-bold">Income transaction</h2>

          <Table className="mt-5" striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Order Products</th>
                <th>Topping</th>
                <th>Price Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.userOrder.name}</td>
                  <td>{item.carts.products.title}</td>
                  <td>{item.carts.toppings.title}</td>
                  <td>
                    {item.carts.products.price + item.carts.toppings.price}
                  </td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
