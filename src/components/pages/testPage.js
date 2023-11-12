import { React, Component } from "react";
import Header from "../Header";


export default class testPage extends Component {
  render() {
    document.title = 'BeautyBot | TestPage'
    return (
      
      <div>
        <title>123</title>
        <h1>
          <Header title="TestPage" />
        </h1>
      </div>
    );
  }
}
