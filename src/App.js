import React, { Component } from 'react';
// import logo from './logo.svg';
// import React from 'react'
import './App.css'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }




class Texto extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="Texto">
        <a href={this.props.url}><h2>{this.props.title}</h2></a>
        <p>{this.props.texto}</p>
      </div>
    );
  }
}

class Photo extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <a href={this.props.url}><img src={this.props.src} alt={this.props.alt}/></a>
    )
  }
}

class Noticia extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Noticia">
        <Photo src={this.props.src} url={this.props.url}  alt={this.props.alt}/>
        <Texto title={this.props.title} url={this.props.url} texto={this.props.texto}/>
      </div>
    )
  }
}

class Base extends React.Component {
  constructor (props) {
    super(props);
    this.sty = { align: 'center' }
    this.state = {newsAPI: []}
  }

  componentDidMount() {
    fetch('http://localhost:3001/')
      .then(texto => { return texto.json().then((data)=> {
        let t = data.articles.filter((e, index)=>{
          if(e.description === null || e.urlToImage === null) {
            return false
          }
          return true
        })
        console.log(t);
        t = t.map((e, index)=>{
          return <Noticia key={index.toString()} title={e.title} src={e.urlToImage} alt={"oi"} url={e.url} texto={e.description} />
        })
        this.setState({newsAPI: t})
        // this.setState({texto: data.articles[9].description})
        console.log('this.newsAPI');
        console.log(data.articles);
      })
  }).catch(e=>console.log(e))
  }

  render () {
    return (
      <div style={this.sty}>
        {this.state.newsAPI}
      </div>
    )
  }
}



// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <Corpo />,
//   rootElement);


export default Base
