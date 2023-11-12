import { React, Component } from "react";
import Header from "../Header";

export default class Logs extends Component {
  render() {    document.title = 'BeautyBot | Логи'
    return (
        <h1>
        <Header title="Логи" />
      </h1>
    );
  }
}