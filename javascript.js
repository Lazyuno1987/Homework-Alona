const books = [
    
	{
		id: '1',
		title: `Apple. Эволюция компьютера`,
		author: `Владимир Невзоров`,
		img: `https://bukva.ua/img/products/449/449532_200.jpg`,
		plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей,
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники.
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
	},
	{
		id: '2',
		title: `Как объяснить ребенку информатику`,
		author: `Кэрол Вордерман`,
		img: `https://bukva.ua/img/products/480/480030_200.jpg`,
		plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы,
    оставаясь в безопасности.
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве,
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина -
    объясняются наглядно с помощью иллюстраций и схем.`,
	},
	{
		id: '3',
		title: `Путь скрам-мастера. #ScrumMasterWay`,
		author: `Зузана Шохова`,
		img: `https://bukva.ua/img/products/480/480090_200.jpg`,
		plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой.
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера,
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером,
    какими инструментами ему нужно пользоваться.`,
	},
];

localStorage.setItem("books", JSON.stringify( books));




const root = document.querySelector("#root");
const leftDiv = document.createElement("div");
leftDiv.classList.add("left-div");
const rightDiv = document.createElement("div");
rightDiv.classList.add("right-div");
root.append(leftDiv, rightDiv);


const rightSide = document.querySelector(".right-div")
const headerEl = document.createElement("h1");
headerEl.textContent = "Books list";
const listRef = document.createElement("ul");
listRef.classList.add("booksList")
const btnEl = document.createElement("button");
btnEl.classList.add("btn-add")
btnEl.textContent = "Add new book";
btnEl.addEventListener("click", addBook)

leftDiv.append(headerEl, listRef, btnEl);

function renderList() {
    const books = JSON.parse(localStorage.getItem("books"));
    const listMurkup = books.map(book => {
        const liEl = `<li id = ${book.id} class="item"><p class = "text-item">${book.title}</p><button class = "edit-btn">Edit</button><button class ="del-btn">Delete</button></li>`;
        return liEl;
        }).join('');
    
     document.querySelector(".booksList").insertAdjacentHTML("beforeend", listMurkup);
    const p = document.querySelectorAll(".text-item");
    p.forEach(el => el.addEventListener("click", renderPrewiew))
    document.querySelectorAll(".edit-btn").forEach(el =>el.addEventListener("click", editEl))
     document.querySelectorAll(".del-btn").forEach(el =>el.addEventListener("click", delEl))
}
renderList();
  
function renderPrewiew(event) {
    console.log(event.target.textContent)
    const books = JSON.parse(localStorage.getItem("books"));
    const book = books.find(book => book.title === event.target.textContent)
    rightDiv.innerHTML = "";
    rightDiv.insertAdjacentHTML("beforeend", renderPrewiewMurkUp(book))
    
}

function renderPrewiewMurkUp(book) {
    console.log(book)
    return `<div class = "book-discr-container"><h2 class = "disk-title">${book.title}</h2><p class = "autor-name">${book.author}</p><img src ="${book.img}" alt = "" class = "book-img"/><p class ="book-discr" >${book.plot}</p></div>`
    
}

function editEl(event) {
      rightDiv.innerHTML = "";
    const books = JSON.parse(localStorage.getItem("books"));
     const book = books.find(book => book.id === event.target.parentNode.id);
     rightDiv.insertAdjacentHTML("beforeend", bookFormMurkUp(book));
     
     fillObject(book);
       const save = document.querySelector(".save-btn");
     save.addEventListener("click", saveEditBook);
     function saveEditBook() {
          const bookIndex = books.findIndex(
               (el) => el.id === event.target.parentNode.id
          );
          books.splice(bookIndex, 1, book);
          localStorage.setItem("books", JSON.stringify(books))
          console.log(book);
          listRef.innerHTML = "";
          rightDiv.innerHTML = "";
          setTimeout(() => {
               alert("Books succsessfully edited!"), 500
          })
    renderList();
     };
     
}


function delEl(event) {
    const books = JSON.parse(localStorage.getItem("books"));
    const book = books.find(book => book.id === event.target.parentNode.id);
    const newBook = books.filter(el => el.id !== book.id);
    localStorage.setItem('books', JSON.stringify(newBook));
    const bookTitle = document.querySelector(".disk-title");
    if (bookTitle) {
   
        if (book.title === bookTitle.textContent) {
            rightDiv.innerHTML = "";
    
        }
    }
     listRef.innerHTML = "";
     setTimeout(() => {
               alert("Books succsessfully deleted!"), 500
          })
    renderList();
}


function bookFormMurkUp({title,author,img,plot}) {
    return ` <form class ="form-el" action="">
      <label>Book Title
          <input value="${title}" name = "title" class = "input1 input" type="text" >
      </label>
      <label>Book Author
       <input value="${author}" name = "author" class = "input2 input" type="text">
        </label>
      <label>Book Img
       <input value="${img}" name = "img" class = "input3 input" type="text">
        </label>
      <label>Book Description
       <input value="${plot}" name = "plot" class = "input4 input" type="text">
        </label>
        <button class = "save-btn" type="button">Save</button>
    </form>`
}

function addBook() {
    const newbook = {
        id: `${Date.now()}`,
        title: "",
        author: "",
        img: "",
        plot: "",
       }
    rightDiv.innerHTML = bookFormMurkUp(newbook);
    fillObject(newbook);
    const save = document.querySelector(".save-btn");
    save.addEventListener("click", saveBook);
    function saveBook() {
        console.log(Object.values(newbook))
        if (Object.values(newbook).some(el => el === "")) {
            alert("Fill all inputs");
            return;
        }
    
        const books = JSON.parse(localStorage.getItem("books"));
        console.log(books)
        books.push(newbook);
        localStorage.setItem('books', JSON.stringify(books));
       
        rightDiv.innerHTML = "";
        rightDiv.insertAdjacentHTML("beforeend", renderPrewiewMurkUp(newbook));
        listRef.innerHTML = "";

        renderList();
     
    }
}


function fillObject(book) {
     console.log( book)
        //console.log( book[el.target.name])
    const input = document.querySelectorAll(".input");
   input.forEach(el => el.addEventListener("change", mvoh));
        function mvoh(el) {
        console.log(el)
        book[el.target.name] = el.target.value;
    }
//=================================================================
     //============================================================
//    form.addEventListener("change", )
}

// const formEl = document.querySelector(".form");

// const buttonEl = document.querySelector("button");
// buttonEl.addEventListener("click", onFormSubmit)
















// let delay;

// function onFormSubmit(event) {
//     event.preventDefault();
//     // createPromise()
//     let Fdelay = Number(formEl.elements.delay.value);
//     let step = Number(formEl.elements.step.value);
//     let amount = Number(formEl.elements.amount.value);
//     for (let i = 0; i < amount; i += 1) {
//         createPromise(i, Fdelay)
//             .then(({ position, delay }) => {
//                 console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//             })
//             .catch(({ position, delay }) => {
//                 console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//             });
//        Fdelay += step;
//     }
// };

















// function createPromise(position, delay) {
//     console.log(position);
//     console.log(delay)
//    return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const shouldResolve = Math.random() > 0.3;
//             if (shouldResolve) {
//                 resolve({ position, delay });
               
//             } else {
//                 reject({ position, delay });
//             }
//         }, delay);
//     });
// }
            
//        fetch('https://jsonplaceholder.typicode.com/todos/1?fields=id,title,')
//   .then(response => response.json())
//   .then(data => console.log(data))


