let reservName = document.getElementById("name");
let phone = document.getElementById("phone");
let date = document.getElementById("date");
let time = document.getElementById("time");
let count = document.getElementById("count");
let reservationBtn = document.getElementById("reservation-btn");
let reservationList = document.querySelector(".reservation-list");

document.addEventListener("DOMContentLoaded", renderItems);

function renderItems() {
  const all = getReservItem();
  if (all.length === 0) {
    reservationList.style.display = "none";
    return;
  }
  reservationList.style.display = "block";

  reservationList.innerHTML = "";
  all.forEach((item) => {
    reservationList.innerHTML += `
      <div class="reservation-box">
        <p><b>Name</b> : ${item.name}</p>
        <p><b>Phone number</b>: ${item.phone}</p>
        <p><b>Date</b> : ${item.date}</p>
        <p><b>Time</b> : ${item.time}</p>
        <p><b>Number of people</b> : ${item.count}</p>
        <button class="delete-btn">Delete 🗑</button>
      </div>`;
  });
  let deleteBtn = document.querySelectorAll(".delete-btn");

  deleteBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => deleteReservation(index));
  });
  function deleteReservation(index) {
    const allReserve = getReservItem();
    allReserve.splice(index, 1);
    saveReservItem(allReserve);
    renderItems();
  }
}
function getReservItem() {
  return JSON.parse(localStorage.getItem("reservation")) || [];
}
function saveReservItem(data) {
  localStorage.setItem("reservation", JSON.stringify(data));
}
reservationBtn.addEventListener("click", () => {
  if (
    !reservName.value.trim() ||
    !phone.value.trim() ||
    !date.value.trim() ||
    !time.value.trim() ||
    !count.value.trim()
  ) {
    alert("لطفا تمامی فیلدهارا پر کنید");
    return;
  }
  let reservInfo = {
    name: reservName.value,
    phone: phone.value,
    date: date.value,
    time: time.value,
    count: count.value,
  };

  const current = getReservItem();
  current.push(reservInfo);
  saveReservItem(current);
  renderItems();
  document.querySelector(".reservation-form").reset();
});
