import React, { Component } from 'react';

class Forms extends Component {
  render() {
    return (
      <div className="flex justify-center">
        <form className="text-center space-y-2">
          <p>Largura:</p>
          <input type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <p>Altura:</p>
          <input type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <p>Número de portas:</p>
          <input type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <p>Número de janelas:</p>
          <input type="number" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-200px py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          <br />
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Próxima</button>
        </form>
      </div>
    );
  }
}

export default Forms;
