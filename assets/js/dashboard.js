// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYmiCLqD9PY2VIhh0fC1e5ezbsj01FDR4",
  authDomain: "behonest2213.firebaseapp.com",
  databaseURL: "https://behonest2213-default-rtdb.firebaseio.com",
  projectId: "behonest2213",
  storageBucket: "behonest2213.appspot.com",
  messagingSenderId: "661398569271",
  appId: "1:661398569271:web:14d4869cc3676658781ab2",
  measurementId: "G-TMWPM3TVHQ"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var value = localStorage.getItem("useruid");
var userref = firebase.database().ref('users/' + value);

function welcome() {
  // Use once() to get data only once
  userref.once('value')
    .then(snapshot => {
      // Get the full_name from the snapshot
      var full_name = snapshot.val().full_name;

      // Display the welcome message
      document.getElementById('welcome').innerHTML = "Welcome, " + full_name + "🔥";
    })
    .catch(error => {
      console.error("Error getting user data: ", error);
    });
}

// Call the welcome function
welcome();

let deleteTarget;

function openPopup() {
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function addBox() {
  const gridContainer = document.getElementById('gridContainer');
  const boxName = document.getElementById('boxName').value;
  const boxInfo = document.getElementById('boxInfo').value;

  localStorage.setItem('currentfolder', "");
  console.log(`current folder: ${localStorage.getItem("currentfolder")}`);

  if (boxName && boxInfo) {
    const newBox = document.createElement('div');
    newBox.className = 'grid-item';
    newBox.innerHTML = `${boxName}<br><small id="info">${boxInfo}</small><button class="open-btn" onclick="executeFunction('${boxInfo}')">Open</button><button class="delete-btn" onclick="showDeleteConfirm(this)">Delete</button>`;
    newBox.setAttribute('data-info', boxInfo);
    gridContainer.insertBefore(newBox, gridContainer.lastElementChild);

    // Save boxInfo to local storage
    saveBoxToLocalStorage(boxInfo, boxName, boxInfo);

    closePopup();
  } else {
    alert('Please enter both box name and custom info.');
  }
}

function saveBoxToLocalStorage(key, boxName, boxInfo) {
  // Get existing boxes from local storage
  const existingBoxes = JSON.parse(localStorage.getItem('openedBoxes')) || [];

  // Add the new box to the array
  existingBoxes.push({
    key,
    boxName,
    boxInfo
  });

  // Save the updated array back to local storage
  localStorage.setItem('openedBoxes', JSON.stringify(existingBoxes));
}

function showDeleteConfirm(button) {
  deleteTarget = button.parentElement;
  document.getElementById('deleteConfirmPopup').style.display = 'flex';
}

function closeDeleteConfirm() {
  document.getElementById('deleteConfirmPopup').style.display = 'none';
}

function deleteBoxCancel() {
  closeDeleteConfirm();
  deleteTarget = null;
}

function deleteBoxConfirm() {
  if (deleteTarget) {
    // Get the boxInfo from the deleted box
    const boxInfo = deleteTarget.getAttribute('data-info');

    // Remove the box from the grid
    deleteTarget.parentNode.removeChild(deleteTarget);
    closeDeleteConfirm();
    deleteTarget = null;

    // Remove the boxInfo from local storage
    removeBoxFromLocalStorage(boxInfo);
  }
}

function removeBoxFromLocalStorage(boxInfo) {
  // Get existing boxes from local storage
  const existingBoxes = JSON.parse(localStorage.getItem('openedBoxes')) || [];

  // Remove the box with the specified boxInfo
  const updatedBoxes = existingBoxes.filter(box => box.key !== boxInfo);

  // Save the updated array back to local storage
  localStorage.setItem('openedBoxes', JSON.stringify(updatedBoxes));
}

window.addEventListener('load', () => {
  localStorage.setItem('currentfolder', '');

  // Load existing boxes from local storage and display them
  const existingBoxes = JSON.parse(localStorage.getItem('openedBoxes')) || [];
  const gridContainer = document.getElementById('gridContainer');

  existingBoxes.forEach(box => {
    const newBox = document.createElement('div');
    newBox.className = 'grid-item';
    newBox.innerHTML = `${box.boxName}<br><small id="info">${box.boxInfo}</small><button class="open-btn" onclick="executeFunction('${box.key}')">Open</button><button class="delete-btn" onclick="showDeleteConfirm(this)">Delete</button>`;
    newBox.setAttribute('data-info', box.boxInfo);
    gridContainer.insertBefore(newBox, gridContainer.lastElementChild);
  });
});

function executeFunction(element) {
  console.log(element);
  localStorage.setItem('currentfolder', element);

  window.location.href = 'app.html';
}
