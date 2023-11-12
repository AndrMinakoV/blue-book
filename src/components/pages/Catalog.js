import { React, Component } from "react";
import Header from "../Header";

export default class Catalog extends Component {
  render() {    document.title = 'BeautyBot | Управление каталогом'
    return (
        <h1>
        <Header title="Управление каталогом" />
      </h1>
    );
  }
}