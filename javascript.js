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















const root = document.querySelector("#root");
const leftDiv = document.createElement("div");
const rightDiv = document.createElement("div");
root.append(leftDiv, rightDiv);
leftDiv.classList.add("left-div");
rightDiv.classList.add("right-div");
const headEl = document.createElement("h1");
headEl.textContent = "Books list";
const listRef = document.createElement("ul");
listRef.classList.add("booksList")
const btnEl = document.createElement("button");
btnEl.classList.add("btn-add")
btnEl.textContent = "Add new book";
leftDiv.append(headEl, listRef, btnEl);

const delEl = (event) => {
    console.log("Delete");
}

const editEl = (event) => {
    const book = books.find(book => book.id === event.target.parentNode.id )
console.log(book) 
}

function renderList() {
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
   
    const book = books.find(book => book.title === event.target.textContent)
    rightDiv.innerHTML = "";
    rightDiv.insertAdjacentHTML("beforeend", renderPrewiewMurkUp(book))
    
}

function renderPrewiewMurkUp(books) {
    return `<div class = "book-discr-container"><h2 class = "disk-title">${books.title}</h2><p class = "autor-name">${books.author}</p><img src ="${books.img}" alt = "" class = "book-img"/><p class ="book-discr" >${books.plot}</p></div>`
    
}