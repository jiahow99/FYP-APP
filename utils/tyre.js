// Generate inches for tyres
// Customize start and end size
const generateInchArray = () => {
    const inchArray = [];
  
    for (let i = 16; i <= 24; i++) {
      inchArray.push(i);
    }
    return inchArray;
};
export const inchOptions = generateInchArray();

export const brandOptions = [
  {
    'name' : 'Michelin',
    'src' : require('../assets/images/michelin.png'),
  },
  {
    'name' : 'Continental',
    'src' : require('../assets/images/continental.png'),
  },
  {
    'name' : 'Cooper',
    'src' : require('../assets/images/cooper_tier.png'),
  },
  {
    'name' : 'Bridgestone',
    'src' : require('../assets/images/bridgestone.png'),
  },
  {
    'name' : 'Yokohama',
    'src' : require('../assets/images/yokohama.png'),
  },
  {
    'name' : 'Hankook',
    'src' : require('../assets/images/hankook.png'),
  },
  {
    'name' : 'Pirelli',
    'src' : require('../assets/images/pirelli.png'),
  },
  {
    'name' : 'Good Year',
    'src' : require('../assets/images/goodyear.png'),
  }
]

export const tyreResultsDummy = [
  {
    'name' : 'Continental 1',
    'brand' : 'Continental',
    'price' : 150,
    'src' : require('../assets/images/tyre.png')
  },
  {
    'name' : 'Bridgestone 1',
    'brand' : 'Bridgestone',
    'price' : 120,
    'src' : require('../assets/images/tyre2.png')
  },
  {
    'name' : 'Hankook 1',
    'brand' : 'Hankook',
    'price' : 88,
    'src' : require('../assets/images/tyre2.png')
  },
  {
    'name' : 'Pirelli 1',
    'brand' : 'Pirelli',
    'price' : 60,
    'src' : require('../assets/images/tyre.png')
  },
  {
    'name' : 'Good Year 1',
    'brand' : 'Good Year',
    'price' : 80,
    'src' : require('../assets/images/tyre2.png')
  }
]

export const tyrePreviews = [
  require('../assets/images/tyre2.png'),
  require('../assets/images/tyre2.png'),
  require('../assets/images/tyre2.png')
]