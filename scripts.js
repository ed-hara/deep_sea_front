/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/navios';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.navios.forEach(item => insertList(item.nome, item.imo, item.eta, item.etb, item.ets, item.terminal, item.obs, item.email))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputNome, inputImoNumero, inputEta, inputEtb, inputEts, inputTerminal, inputObs, inputEmail) => {
  const formData = new FormData();
  formData.append('nome', inputNome);
  formData.append('imo', inputImoNumero);
  formData.append('eta', inputEta);
  formData.append('etb', inputEtb);
  formData.append('ets', inputEts);
  formData.append('terminal', inputTerminal);
  formData.append('obs', inputObs);
  formData.append('email', inputEmail);

  let url = 'http://127.0.0.1:5000/navio';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/navio?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo cadastro de Navio 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputNome = document.getElementById("newNome").value;
  let inputImoNumero = document.getElementById("newImo").value;
  let inputEta = document.getElementById("newEta").value;
  let inputEtb = document.getElementById("newEtb").value;
  let inputEts = document.getElementById("newEts").value;
  let inputTerminal = document.getElementById("newTerminal").value;
  let inputObs = document.getElementById("newObs").value;
  let inputEmail = document.getElementById("newEmail").value;

  if (inputNome === '') {
    alert("Escreva o nome de um navio!");
  } else if (isNaN(inputImoNumero)) {
    alert("O Imo precisa ser número!");
  } else {
    insertList(inputNome, inputImoNumero, inputEta, inputEtb, inputEts, inputTerminal, inputObs, inputEmail);
    postItem(inputNome, inputImoNumero, inputEta, inputEtb, inputEts, inputTerminal, inputObs, inputEmail);
    alert("Item adicionado!");
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nome, imo, eta, etb, ets, terminal, obs, email) => {
  var item = [nome, imo, eta, etb, ets, terminal, obs, email]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newNome").value = "";
  document.getElementById("newImo").value = "";
  document.getElementById("newEta").value = "";
  document.getElementById("newEtb").value = "";
  document.getElementById("newEts").value = "";
  document.getElementById("newTerminal").value = "";
  document.getElementById("newObs").value = "";
  document.getElementById("newEmail").value = "";

  removeElement()
}

