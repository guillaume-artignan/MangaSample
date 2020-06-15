import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class Manga extends Component{

  render(){
    return <ul className="Manga">
      
        <li className="titre">{this.props.titre}</li>
        <li className="image"><img src={this.props.image} /></li>              
        <li className="description">{this.props.description}</li>              
        <li className="categorie">{this.props.categorie}</li>     
                
    </ul>;
  }
}


class App extends Component {

  constructor(){
    super();
    this.state = {};
    this.state.data = null;
    this.state.page = 0;
  }

  componentDidMount(){
    this.appelWS(this.state.page);
  }

  appelWS(page){
    fetch("http://92.222.69.104/mangas?size=3&page="+page)
      .then((d)=> d.json())
      .then((data)=> this.mangasLoaded(data))
  }

  mangasLoaded(data){
    console.log(data);
    this.setState({"data" : data});
  }

  prevPage(){
    this.setState({page : this.state.page-1});

    this.appelWS(this.state.page-1);
  }

  nextPage(){
    this.setState({page : this.state.page+1});
    this.appelWS(this.state.page+1);
  }

  render(){
    
    if (this.state.data){
      var content = this.state.data.content;
      return (
        <div className="nav">
          <button disabled={this.state.data.first} onClick={()=> this.prevPage()}>&lt;</button>
          <button disabled={this.state.data.last} onClick={()=> this.nextPage()}>&gt;</button>
          {this.state.page+1} / {this.state.data.totalPages} 
        <div className="App">
            {
              content.map((item,i)=> 
                <Manga key={i} titre={item.titre} image={item.image} description={item.description} categorie={item.categorie}></Manga>
              )
            }

            
        </div>
        </div>
      );
    }else {
      return (
        <div className="App">
          En cours de chargement ...
        </div>
      );
    }

    
  }
}

export default App;
