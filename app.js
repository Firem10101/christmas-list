let items = [];

function renderList() {
  const listDiv = document.getElementById('list');
  listDiv.innerHTML = '';

  items.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    const img = document.createElement('img');
    img.src = item.image || '';
    itemDiv.appendChild(img);

    const text = document.createElement('div');
    text.innerHTML = `<strong>${item.name}</strong><br>$${item.price}`;
    itemDiv.appendChild(text);

    const button = document.createElement('button');
    button.textContent = 'Claim';
    button.onclick = () => {
      items.splice(index, 1);
      renderList();
    };
    itemDiv.appendChild(button);

    listDiv.appendChild(itemDiv);
  });
}

function addItem() {
  const name = document.getElementById('item-name').value;
  const price = document.getElementById('item-price').value;
  const imageInput = document.getElementById('item-image');

  if (!name || !price) return alert('Please enter name and price');

  const reader = new FileReader();
  reader.onload = function(e) {
    items.push({ name, price, image: e.target.result });
    renderList();
  };

  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    items.push({ name, price, image: '' });
    renderList();
  }

  document.getElementById('item-name').value = '';
  document.getElementById('item-price').value = '';
  imageInput.value = '';
}

renderList();
