import { React, Component } from "react";
import Header from "../Header";

export default class Home extends Component {
  render() {    document.title = 'BeautyBot | Adminpanel'
    return (
      <div>
        <h1>
          <Header title="Панель управления" />
        </h1>
        <div className="navigation">
          <h2 className="h2">Выберите функцию.</h2>
          <ul className="Pompadur">
            <li>
              <a сlass="active" href="/">
                Панель управления
              </a>
            </li>
            <li>
              <a href="/userpanel">Панель управления пользователями</a>
            </li>
            <li>
              <a href="/logs">Логи</a>
            </li>
            <li>
              <a href="/orders">Список заказов</a>
            </li>
            <li>
              <a href="/alerts">Управление рассылкой</a>
            </li>
            <li>
              <a href="/catalog">Управление каталогом</a>
            </li>
            <li>
              <a href="/testPage">testPage</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
