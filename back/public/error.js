const reqContentError = {
  err: {
    status: '400',
    message: {
      message: 'As informações inseridas são inválidas',
    },
  },
};

const proportionError = {
  err: {
    status: 400,
    message: {
      message: 'O total de área das portas e janelas deve ser no máximo 50% da área de parede',
    },
  },
};

const minWallHeightError = {
  err: {
    status: 400,
    message: {
      message: 'A altura de paredes com porta deve ser no mínimo, 30cm maior que a altura da porta',
    },
  },
};

module.exports = {
  proportionError,
  minWallHeightError,
};
