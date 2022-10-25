const getData = async () => {
  try {
    const res = await fetch('./data.json');
    const data = await res.json();
    renderData(data);
  } catch (error) {
    console.log(error);
  }
};

function renderMaxBar(data) {
  const amounts = data.map((entry) => entry.amount);
  const maxAmount = Math.max(...amounts);
  const maxIndex = amounts.indexOf(maxAmount);
  const bar = document.getElementById(data[maxIndex].day);
  bar.classList.add('max');
  bar.querySelector('.amount').textContent = `$${maxAmount}`;

  return [maxIndex, maxAmount];
}

function renderBars(data, maxIndex, maxAmount) {
  const remainder = [...data];
  remainder.splice(maxIndex, 1);

  remainder.forEach((entry) => {
    const height = (entry.amount / maxAmount) * 100;
    const bar = document.getElementById(entry.day);
    bar.style.height = `${height}%`;
    bar.querySelector('.amount').textContent = `$${entry.amount}`;
  });
}

function renderData(data) {
  const [maxIndex, maxAmount] = renderMaxBar(data);
  renderBars(data, maxIndex, maxAmount);
}

getData();
