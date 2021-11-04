import React, { Component } from 'react';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.nextWall = this.nextWall.bind(this);
    this.state = {
      walls: [{
        wall: 1,
        width: 0,
        height: 0,
        door: 0,
        window: 0,
      }],
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
  
    this.setState({
      walls: [{
        ...this.state.walls[0],
        [name]: parseInt(value),
      }],
    });
  }

  nextWall() {
    const maxWalls = 4;

    this.setState({
      walls: [{
        ...this.state.walls[0],
        wall: this.state.walls[0].wall + 1,
      }]
    })
  }

  render() {
    const { wall } = this.state.walls[0];
    return (
      <div className="flex justify-center">
        <form className="text-center space-y-2">
          <p className="text-2xl">{`Parede ${wall}`}</p>
          <p>Largura:</p>
          <input type="number" name="width" onChange={this.handleChange} placeholder="metros" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <p>Altura:</p>
          <input type="number" name="height" onChange={this.handleChange} placeholder="metros" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <p>Número de portas:</p>
          <input type="number" name="door" onChange={this.handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <p>Número de janelas:</p>
          <input type="number" name="window" onChange={this.handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <br />
          <button type="button" onClick={this.nextWall} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Próxima</button>
        </form>
      </div>
    );
  }
}

export default Forms;
