import React, { Component } from 'react';
// import bussinessRules from '../services/utils';

class Header extends Component {
  // generateRules() {
  //   return Object.values(bussinessRules).map((rule, index) => {
  //     console.log(1);
  //     return (<li key={ index }>{rule}</li>);
  //   });
  // }

  render() {
    return (
      <div className="text-center">
        <h1 className="text-4xl">Calculador de pinturas</h1>
        <p>Calcule quantas latas serão necessárias para a pintura do seu cômodo!</p>
        <p>Para obter o resultado, insira as informações das paredes a seguir:</p>
      </div>
    );
  }
}

export default Header;
