import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  changeText() {
    console.log(this);
    $.ajax({
      url: "http://localhost:3001/api/add",
      dataType: 'json',
      type: 'POST',
      data: {name : this.state.temperature},
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("http://localhost:3001/api/add", status, err.toString());
      }.bind(this)
    });
  }

  render() {
    const { items = [] } = this.props;
    return (
      <div>
        <h1>Hello SSR!</h1>
        <h2><label class="col-sm-2 col-form-label">Word:</label></h2>
          <input
            onChange={this.handleChange.bind(this)} />
          <button onClick={this.changeText.bind(this)}>change</button>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>id</th>
              <th>ワード</th>
              <th>ツイート数</th>
              <th>開始日時</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              return (<tr key={item.id}>
                <td>{ item.id }</td>
                <td>{ item.q }</td>
                <td>{ item.tweets_num }</td>
                <td>{ item.create_at }</td>
              </tr>);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

App.propTypes = {
  items: PropTypes.array
};
