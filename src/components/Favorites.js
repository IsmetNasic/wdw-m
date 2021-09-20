import React, { Component } from 'react';

class Favorites extends Component {
    constructor(){
        super();
        this.state={
            favStar: [],
            favIds: []
        };
      }

    // local storage
   componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }
  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }
    render(){
        return (
            <div className="container">
            {this.state.favStar.map(item => {
              return(
                    <div className="alert-box" key={item[0].id}>
                        <p>{item[0].text} - {item[0].message_type.name}</p>
                        <img className="text-image" alt="not working" src={item[0].thumbnail_sq64 || require("../images/pic01.jpg").default }/>
                    </div>
              )
            })}
            </div>
        )
    }
}
export default Favorites