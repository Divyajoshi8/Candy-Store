const form = document.querySelector('form');
const itemInput = document.querySelector('#item');
const desInput = document.querySelector('#description');
const priInput = document.querySelector('#price');
const qntyInput = document.querySelector('#quantity');
const plist = document.querySelector('#Purchaselist');
const BASE_URL = 'https://crudcrud.com/api/18fbaf0e9ee042d6a6883fb1584f5a85/storageData';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const item = itemInput.value;
    const des = desInput.value;
    const pri = priInput.value;
    const qnty = qntyInput.value;

    const userData = {
        item,
        des,
        pri,
        qnty,
    };

    axios.post(BASE_URL, userData)
    .then(() => {
        displayData();
        clearInputs();
    })
    .catch((error) => {
        console.log(error);
    });
});

//functionality to display data in a local storage
function displayData() {
    axios.get(BASE_URL)
      .then((response) => {
        let data = `<table>
                      <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        
                      </tr>`;
  
        response.data.forEach((user) => {
          data += `<tr>
                    <td>${user.item}</td>
                    <td>${user.des}</td>
                    <td>${user.pri}</td>
                    <td>${user.qnty}</td>
                    <td><button class="buy1-btn" data-id="${user._id}">Buy 1</button></td>
                    <td><button class="buy2-btn" data-id="${user._id}">Buy 2</button></td>
                    <td><button class="buy3-btn" data-id="${user._id}">Buy 3</button></td>
                  </tr>`;
        });
  
        data += `</table>`;
        plist.innerHTML = data;
        addBuy1EventListeners();
        addBuy2EventListeners();
        addBuy3EventListeners();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

// Buy 1 function
function addBuy1EventListeners() {
    const buy1Btns = document.querySelectorAll('.buy1-btn');
    buy1Btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const itemId = e.target.dataset.id;
        axios.get(`${BASE_URL}/${itemId}`)
          .then((response) => {
            const { item, des, pri, qnty } = response.data;
            if (qnty >= 1) {
              const updatedQuantity = qnty - 1;
              axios.put(`${BASE_URL}/${itemId}`, { item, des, pri, qnty: updatedQuantity })
                .then(() => {
                  displayData();
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              alert('Quantity is not sufficient');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };
  

// Buy 2 function
function addBuy2EventListeners() {
    const buy2Btns = document.querySelectorAll('.buy2-btn');
    buy2Btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const itemId = e.target.dataset.id;
        axios.get(`${BASE_URL}/${itemId}`)
          .then((response) => {
            const { item, des, pri, qnty } = response.data;
            if (qnty >= 2) {
              const updatedQuantity = qnty - 2;
              axios.put(`${BASE_URL}/${itemId}`, { item, des, pri, qnty: updatedQuantity })
                .then(() => {
                  displayData();
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              alert('Quantity is not sufficient');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };
  

  //buy3 function
  
  function addBuy3EventListeners() {
    const buy3Btns = document.querySelectorAll('.buy3-btn');
    buy3Btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const itemId = e.target.dataset.id;
        axios.get(`${BASE_URL}/${itemId}`)
          .then((response) => {
            const { item, des, pri, qnty } = response.data;
            if (qnty >= 3) {
              const updatedQuantity = qnty - 3;
              axios.put(`${BASE_URL}/${itemId}`, { item, des, pri, qnty: updatedQuantity })
                .then(() => {
                  displayData();
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              alert('Quantity is not sufficient');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

//clearing input field
  function clearInputs(){
    itemInput.value = '';
    desInput.value = '';
    priInput.value = '';
    qntyInput.value = '';
    

}

//call displayData function on page load
displayData();





