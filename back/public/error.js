const reqContentError = {
  err: {
    status: 400,
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

const reqQuantError = {
  err: {
    status: 400,
    message: {
      message: 'Você deve informar apenas uma parede para validação, ou 4 paredes para o calculo',
    },
  },
};

module.exports = {
  proportionError,
  minWallHeightError,
  reqContentError,
  reqQuantError,
};
