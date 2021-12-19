const saveData = (data, tbody) => {
  if (tbody.innerHTML === "") {
  }
};

const inChecked = (data) => {
  const masCheckboxEmployee = [
    ...document.querySelectorAll("#checkboxEmployee"),
  ];

  data.forEach((item, i) => {
    if (masCheckboxEmployee[i].checked === true) {
      item.checkbox = true;
    } else {
      item.checkbox = false;
    }
  });
};

const deleteEmployee = (data, tbody) => {
  const masDeletedRowEmployee = [
    ...data.filter((row) => row.checkbox === true),
  ];

  data.forEach((item, i) => {
    if (item.checkbox === true) {
      data.splice(i, 1);
    }
  });
  drawRow(data, tbody);
};

const countEmployee = (data) => {
  const captionCountEmployee = document.querySelector("#captionCountEmployee");
  captionCountEmployee.innerHTML = data.length;
};

const amountSalary = (data) => {
  const captionSalary = document.querySelector("#captionSalary");
  let sum = 0;

  data.forEach((item) => {
    if (item.checkbox === true) {
      sum += Number(item.inputSalary);
    }
  });
  captionSalary.innerHTML = sum;
};

const sortTableDateBirth = (data, tbody, event, coords) => {
  if (coords > 318) {
    event.classList.toggle("_down");
    event.classList.remove("_up");

    data.sort((a, b) => a.inputDateBirth - b.inputDateBirth);
    data.reverse();
  }
  if (coords < 320) {
    event.classList.toggle("_up");
    event.classList.remove("_down");

    data.sort((a, b) => a.inputDateBirth - b.inputDateBirth);
  }

  drawRow(data, tbody);
};

const sortTableDateEmployee = (data, tbody, event, coords) => {
  if (coords > 318) {
    event.classList.toggle("_down");
    event.classList.remove("_up");

    data.sort((a, b) => {
      let dateA = new Date(a.inputEmploymentDate);
      let dateB = new Date(b.inputEmploymentDate);
      return dateA - dateB;
    });
    data.reverse();
  }
  if (coords < 320) {
    event.classList.toggle("_up");
    event.classList.remove("_down");

    data.sort((a, b) => {
      let dateA = new Date(a.inputEmploymentDate);
      let dateB = new Date(b.inputEmploymentDate);
      return dateA - dateB;
    });
  }

  drawRow(data, tbody);
};

const drawRow = (data, tbody) => {
  tbody.innerHTML = "";

  data.forEach((item) => {
    tbody.innerHTML += `<tr class="rowEmployee" id = "${item.idEmployee}">
        <td><input type="checkbox" value="${item.checkbox}" id="checkboxEmployee"></td>
        <td>${item.inputName}</td>
        <td>${item.inputDateBirth}</td>
        <td>${item.inputEmploymentDate}</td>
        <td>${item.inputSalary}</td>
    </tr>`;
  });
};

const createRow = (data, tbody) => {
  const form = document.querySelector("#form");
  const inputName = document.querySelector("#inputName");
  const inputDateBirth = document.querySelector("#inputDateBirth");
  const inputEmploymentDate = document.querySelector("#inputEmploymentDate");
  const inputSalary = document.querySelector("#inputSalary");

  data.push({
    idEmployee: Date.now(),
    checkbox: false,
    inputName: inputName.value,
    inputDateBirth: inputDateBirth.value,
    inputEmploymentDate: inputEmploymentDate.value,
    inputSalary: inputSalary.value,
  });

  form.reset();
  drawRow(data, tbody);
};

const init = () => {
  const tbody = document.querySelector("#tbody");
  const btnAddEmployee = document.querySelector("#btnAddEmployee");
  const btnDeleteEmployee = document.querySelector("#btnDeleteEmployee");
  const btnSalaryAmount = document.querySelector("#btnSalaryAmount");
  const sortInputDateBirth = document.querySelector("#sortInputDateBirth");
  const sortInputEmploymentDate = document.querySelector(
    "#sortInputEmploymentDate"
  );

  const data = { employee: [] };

  tbody.addEventListener("click", (event) => {
    inChecked(data.employee, tbody);
  });

  btnAddEmployee.addEventListener("click", (event) => {
    event.preventDefault();

    createRow(data.employee, tbody);
    countEmployee(data.employee);
  });

  btnDeleteEmployee.addEventListener("click", (event) => {
    event.preventDefault();

    deleteEmployee(data.employee, tbody);
  });

  btnSalaryAmount.addEventListener("click", (event) => {
    event.preventDefault();

    amountSalary(data.employee);
  });

  sortInputDateBirth.addEventListener("click", (event) => {
    event.preventDefault();
    const coords = event.pageY - sortInputDateBirth.offsetTop;

    sortTableDateBirth(data.employee, tbody, event.target, coords);
  });

  sortInputEmploymentDate.addEventListener("click", (event) => {
    event.preventDefault();
    const coords = event.pageY - sortInputDateBirth.offsetTop;

    sortTableDateEmployee(data.employee, tbody, event.target, coords);
  });
};

init();
