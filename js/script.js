
const apiUrl = 'https://swapi.dev/api/people/';

extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.match(idRegExp)[1];
  };

transformPerson = (person) => {
  return {
    name: person.name,
    gender: person.gender,
    birth_year: person.birth_year,
    eye_color: person.eye_color,
    height: person.height,
  }
}
  const loading = (load = true, clas) => {
  load ? document.querySelector(`.${clas}`).classList.add("loading"): document.querySelector(`.${clas}`).classList.remove("loading");
}

const getPerson = async (id) => {
  loading(true ,"two");
  
	let res = await fetch(apiUrl + `${id}/`);
	if (!res.ok) {
      throw new Error(`Could not fetch ${apiUrl}` +
        `, received ${res.status}`)
    }
    else if (res.ok) {
      loading(false, 'two');
    }
	return  await transformPerson(await res.json());
}




const getAllPeople = async () => {
  loading(true, 'one');
	let res = await fetch(apiUrl);
	if (!res.ok) {
      throw new Error(`Could not fetch ${apiUrl}` +
        `, received ${res.status}`);
    }
    else if (res.ok) {
      loading(false,'one');
    }
  
	return  await res.json();
}


const changePerson = async (id) => {
  let ul = document.querySelector(".personsInfo");

  while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
  }

  const res = await getPerson(id);
  
    document.querySelector("img").setAttribute("src", `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`);
    
    for (const key in res) {
        let li = document.createElement("li");
        li.innerHTML = `<span class="bol">${key.replace('_',' ')}</span>: ${res[key]}`;
        ul.insertAdjacentElement('beforeend', li);
    }
  
}
 changePerson(1);


const renderAllPeople = async () => {
  let res = await getAllPeople();
  let ul = document.querySelector(".persons");
   res.results.map(el => {
    let li = document.createElement("li");
    li.innerHTML = el.name;
    ul.insertAdjacentElement('beforeend', li);
    li.addEventListener('click', () => {
      changePerson(extractId(el.url));
      document.querySelector('.active').classList.remove('active');
      li.classList.add('active');
    } );
   
    ul.firstElementChild.classList.add('active'); ;
 });
}
renderAllPeople();
  



 
