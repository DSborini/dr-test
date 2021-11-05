import React, { Component } from 'react';
import validateWallsInfo from '../services/apiRequest';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.nextWall = this.nextWall.bind(this);
    this.state = {
      error: '',
      walls: [{
        wall: 1,
        width: '',
        height: '',
        door: '',
        window: '',
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

  resetWallInfo() {
    this.setState({
      error: '',
      walls: [{
        ...this.state.walls[0],
        width: '',
        height: '',
        door: '',
        window: '',
      }],
    });
  }

  async nextWall() {
    const walls = this.state.walls;
    const resp = await validateWallsInfo(walls);
    const { status, data } = resp;
    if (status === 200) {
      this.setState({
        walls: [{
          ...this.state.walls[0],
          wall: this.state.walls[0].wall + 1,
        }],
      });
      this.resetWallInfo();
    };
    if (status === 400) {
      this.setState({
        error: data,
      });
    }
  }

  render() {
    const { wall, width, height, door, window } = this.state.walls[0];
    const { message } = this.state.error;
    return (
      <div className="flex justify-center">
        <form className="text-center space-y-2">
          <p className="text-2xl">{`Parede ${wall}`}</p>
          <p>Largura:</p>
          <input type="number" name="width" onChange={this.handleChange} value={width} placeholder="metros" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <p>Altura:</p>
          <input type="number" name="height" onChange={this.handleChange} value={height} placeholder="metros" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <p>Número de portas:</p>
          <input type="number" name="door" onChange={this.handleChange} value={door} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <p>Número de janelas:</p>
          <input type="number" name="window" onChange={this.handleChange} value={window} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <br />
          <button type="button" onClick={this.nextWall} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Próxima</button>
          <p className="text-red-600">{message}</p>
        </form>
      </div>
    );
  }
}

export default Forms;
