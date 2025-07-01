document.addEventListener('DOMContentLoaded', () => {
  const loginContainer = document.getElementById('loginContainer');
  const agendaContainer = document.getElementById('agendaContainer');

  const usuarioInput = document.getElementById('usuario');
  const senhaInput = document.getElementById('senha');
  const entrarBtn = document.getElementById('entrarBtn');

  const nomeInput = document.getElementById('nome');
  const sobrenomeInput = document.getElementById('sobrenome');
  const enderecoInput = document.getElementById('endereco');
  const telefoneInput = document.getElementById('telefone');

  const adicionarBtn = document.getElementById('adicionarBtn');
  const editarBtn = document.getElementById('editarBtn');
  const salvarBtn = document.getElementById('salvarBtn');
  const cancelarBtn = document.getElementById('cancelarBtn');
  const excluirBtn = document.getElementById('excluirBtn');

  const primeiroBtn = document.getElementById('primeiroBtn');
  const anteriorBtn = document.getElementById('anteriorBtn');
  const proximoBtn = document.getElementById('proximoBtn');
  const ultimoBtn = document.getElementById('ultimoBtn');

  let contatos = [];
  let editIndex = -1;
  let visualizandoIndex = -1;

  function limparCampos() {
    nomeInput.value = '';
    sobrenomeInput.value = '';
    enderecoInput.value = '';
    telefoneInput.value = '';
  }

  function validarCampos() {
    return (
      nomeInput.value.trim() &&
      sobrenomeInput.value.trim() &&
      enderecoInput.value.trim() &&
      telefoneInput.value.trim()
    );
  }

  function mostrarContato(index) {
    const contato = contatos[index];
    if (!contato) return;

    nomeInput.value = contato.nome;
    sobrenomeInput.value = contato.sobrenome;
    enderecoInput.value = contato.endereco;
    telefoneInput.value = contato.telefone;

    visualizandoIndex = index;
  }

  function atualizarNavegacao() {
    if (contatos.length === 0) {
      limparCampos();
      visualizandoIndex = -1;
    } else {
      mostrarContato(visualizandoIndex);
    }
  }

  entrarBtn.addEventListener('click', () => {
    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value.trim();

    if (usuario === 'admin' && senha === 'admin') {
      loginContainer.style.display = 'none';
      agendaContainer.style.display = 'flex';
    } else {
      alert('Usuário ou senha incorretos!');
    }
  });

  adicionarBtn.addEventListener('click', () => {
    if (!validarCampos()) {
      alert('Preencha todos os campos!');
      return;
    }

    contatos.push({
      nome: nomeInput.value.trim(),
      sobrenome: sobrenomeInput.value.trim(),
      endereco: enderecoInput.value.trim(),
      telefone: telefoneInput.value.trim()
    });

    visualizandoIndex = contatos.length - 1;
    atualizarNavegacao();
    limparCampos();
  });

  editarBtn.addEventListener('click', () => {
    if (visualizandoIndex >= 0) {
      const contato = contatos[visualizandoIndex];
      nomeInput.value = contato.nome;
      sobrenomeInput.value = contato.sobrenome;
      enderecoInput.value = contato.endereco;
      telefoneInput.value = contato.telefone;

      editIndex = visualizandoIndex;
      adicionarBtn.style.display = 'none';
      editarBtn.style.display = 'none';
      salvarBtn.style.display = 'inline-block';
      cancelarBtn.style.display = 'inline-block';
    }
  });

  salvarBtn.addEventListener('click', () => {
    if (!validarCampos()) {
      alert('Preencha todos os campos!');
      return;
    }

    contatos[editIndex] = {
      nome: nomeInput.value.trim(),
      sobrenome: sobrenomeInput.value.trim(),
      endereco: enderecoInput.value.trim(),
      telefone: telefoneInput.value.trim()
    };

    salvarBtn.style.display = 'none';
    cancelarBtn.style.display = 'none';
    adicionarBtn.style.display = 'inline-block';
    editarBtn.style.display = 'inline-block';

    atualizarNavegacao();
  });

  cancelarBtn.addEventListener('click', () => {
    salvarBtn.style.display = 'none';
    cancelarBtn.style.display = 'none';
    adicionarBtn.style.display = 'inline-block';
    editarBtn.style.display = 'inline-block';
    atualizarNavegacao();
  });

  excluirBtn.addEventListener('click', () => {
    if (visualizandoIndex >= 0 && confirm('Deseja excluir este contato?')) {
      contatos.splice(visualizandoIndex, 1);
      visualizandoIndex = Math.min(visualizandoIndex, contatos.length - 1);
      atualizarNavegacao();
    }
  });

  primeiroBtn.addEventListener('click', () => {
    if (contatos.length > 0) {
      visualizandoIndex = 0;
      atualizarNavegacao();
    }
  });

  anteriorBtn.addEventListener('click', () => {
    if (visualizandoIndex > 0) {
      visualizandoIndex--;
      atualizarNavegacao();
    }
  });

  proximoBtn.addEventListener('click', () => {
    if (visualizandoIndex < contatos.length - 1) {
      visualizandoIndex++;
      atualizarNavegacao();
    }
  });

  ultimoBtn.addEventListener('click', () => {
    if (contatos.length > 0) {
      visualizandoIndex = contatos.length - 1;
      atualizarNavegacao();
    }
  });
});
