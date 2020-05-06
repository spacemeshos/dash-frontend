// @flow
const chartData = (count) => {
  return new Array(count).fill().map((e, i) => (
    {name: `name-${i}`, uv: randomNumber(1, 100), amt: randomNumber(1, 100)}
  ))
};


const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export default chartData;
