import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataApi: [],
      dataPost: {
        id: "",
        title: "",
        body: "",
      },
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  reloadData() {
    axios.get("http://localhost:3004/posts").then((res) => {
      this.setState({ dataApi: res.data });
    }); //menggunakan axios
  }
  handleRemove(e) {
    const idToDelete = Number(e.target.value);
    console.log(idToDelete);
    fetch(`http://localhost:3004/posts/${idToDelete}`, {
      method: "DELETE",
    }).then((res) => this.reloadData());
  }
  

  inputChange(e) {
    let newdataPost = { ...this.state.dataPost };
    newdataPost["id"] = new Date().getTime();
    newdataPost[e.target.name] = e.target.value;

    this.setState(
      {
        dataPost: newdataPost,
      },
      () => console.log(e.target.value)
    );
  }

  onSubmitForm() {
    const id = this.state.dataPost.id.toString();
    axios.post(`http://localhost:3004/posts/`, { ...this.state.dataPost, id }).then(() => {
      this.reloadData();
    });
  }
  

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(res =>
    //     this.setState({ dataApi: res
    //     })
    // ) //menggunakan fetch

    // axios.get("http://localhost:3004/posts").then((res) => {
    //   this.setState({ dataApi: res.data });
    // }); //menggunakan axios

    this.reloadData();
  }
  render() {
    return (
      <div>
        <h1>Halo Api</h1>
        <input
          type="text"
          name="body"
          placeholder="Masukkan Body"
          onChange={this.inputChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Masukkan Title"
          onChange={this.inputChange}
        />
        <button type="submit" onClick={this.onSubmitForm}>
          Add Data
        </button>
        {this.state.dataApi.map((data, index) => {
          return (
            <div key={index} style={{ padding: "0", margin: "0" }}>
              <p>{data.id}</p>
              <p>{data.title}</p>
              <p>{data.body}</p>
              <button value={data.id} onClick={this.handleRemove}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
