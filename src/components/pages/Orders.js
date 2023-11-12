import { React, Component } from "react";
import Header from "../Header";


export default class Orders extends Component {
  render() {    document.title = 'BeautyBot | Управление заказами'
    return (

      <div>        <h1>
        <Header title="Управление заказами" />
      </h1> </div>
      
    );
  }
}