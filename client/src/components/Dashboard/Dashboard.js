import React from "react";
import { Button } from "react-bootstrap";
import MaterialTable from 'material-table';

import API from "../../utils/API";

export class Dashboard extends React.Component {
  disconnect = () => {
    API.logout();
    window.location = "/";
  };
  state = {
    data: [],
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Type', field: 'type' },
      { title: 'Price', field: 'price', type: 'numeric' },
      { title: 'Rate', field: 'rating', type: 'numeric' },
      { title: 'Warranty', field: 'warranty_years', type: 'numeric' },
      { title: 'Available', field: 'available', type: 'boolean' }
    ]
  }
  componentWillMount() {
    API.products().then(res => {
      this.setState({ data: res.data.products });
    })
  }

  render() {
    return (
      <div className="Dashboard">
        <h1>Produits</h1>
        <MaterialTable
          title="Liste de produits"
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowAdd: newData => 
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  newData._id = Math.max.apply(Math, this.state.data.map(function(p) { return p._id; })) +1;
                  API.addProduct(newData).then(res => {
                    const data = [...this.state.data];
                    data.push(newData);
                    this.setState({ ...this.state, data });
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  API.updateProduct(newData).then(res => {
                    const data = [...this.state.data];
                    data[data.indexOf(oldData)] = newData;
                    this.setState({ ...this.state, data });
                  });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  API.removeProduct(oldData._id).then(res => {
                    const data = [...this.state.data];
                    data.splice(data.indexOf(oldData), 1);
                    this.setState({ ...this.state, data });
                  });
                }, 600);
              }),
          }}
        />
        <Button onClick={this.disconnect} block bsSize="large" type="submit">
          Se déconnecter
        </Button>
      </div>
    );
  }
}
