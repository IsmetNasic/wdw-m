import React from 'react';
import './Home.css';

export default class Home extends React.Component {
  state = {
    loading: true,
    allData: null,
    favStar: [],
    favIds: []
  };
  // funtion to create favorites
  handleFavStar(itemId) {
    const updatedList = this.state.favStar.filter(item => item[0].id === itemId);
    // set the favorites and ids to state
    if(updatedList.length < 1){
      const favFilter = this.state.allData.filter(item => item.id === itemId)
      this.setState({favStar: [...this.state.favStar, favFilter]})
      this.setState({favIds: [...this.state.favIds, itemId]})
    }
    // remove favorites and ids from state
    else{
      const favStar = [...this.state.favStar];
      const updatedFavStar = favStar.filter(item => item[0].id !== itemId);
      this.setState({favStar: updatedFavStar});

      const favIds = [...this.state.favIds];
      const updatedFavIds = favIds.filter(item => item !== itemId);
      this.setState({favIds: updatedFavIds});
    }
  }
  
  async componentDidMount() {
    this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    // fetch data from api and setState to allData and we stop the loading screen
    const url = await fetch('https://www.xn--mngelmelder-l8a.de/api/v1/domain/32/message?sort=-created&fields=id,title,text,thumbnail_sq64,responsible,message_type&style=default', {
    headers: {
        'Accept': 'application/json'
      }
    });
    const response = await url.json();
    this.setState({ allData: response.data, loading: false });
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    this.saveStateToLocalStorage();
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
  saveStateToLocalStorage() {
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  render(){
    // loading and error message
    if (this.state.loading) {
      return <div>loading...</div>;
    }
    if (!this.state.allData) {
      return <div>something went wrong</div>;
    }
    
    let itemsToRender;
    // this if else helps us see favorites
    if (this.state.allData){
      itemsToRender = this.state.allData.map(item => {
        // if favIds has the same id as item.id(clicked item) then we return this block else the other
            if (this.state.favIds.includes(item.id)){
              return(
                <div className="alert-box" key={item.id}>
                  <img className="fav-star" alt="not working" src={ require("../images/star-yellow.png").default } onClick={this.handleFavStar.bind(this, item.id)}/>
                  <p>{item.text} - {item.message_type.name}</p>
                  <img className="text-image" alt="not working" src={item.thumbnail_sq64 || require("../images/pic01.jpg").default }/>
                </div>
              )
            } else {
              return (
                <div className="alert-box" key={item.id}>
                  <img className="fav-star" alt="not working" src={ require("../images/star.png").default } onClick={this.handleFavStar.bind(this, item.id)}/>
                  <p>{item.text} - {item.message_type.name}</p>
                  <img className="text-image" alt="not working" src={item.thumbnail_sq64 || require("../images/pic01.jpg").default }/>
                </div>
              )
            }
      })
    }
    return (
      <div className="container">
        {itemsToRender}
      </div>
    );
  }
}