let pessoas = {}; 

// Função de adicionar tarefa
function adicionarTarefa() {
  const pessoa = document.getElementById("pessoa").value.trim();
  const tarefa = document.getElementById("tarefa").value.trim();
  const dia = document.getElementById("dias").value;

  if (!pessoa || !tarefa) {
    alert("Preencha todos os campos!");
    return;
  }

  if (!pessoas[pessoa]) pessoas[pessoa] = {};
  if (!pessoas[pessoa][dia]) pessoas[pessoa][dia] = [];

  pessoas[pessoa][dia].push({ texto: tarefa, concluida: false });

  renderizarTarefas();
  atualizarContador();

  document.getElementById("pessoa").value = "";
  document.getElementById("tarefa").value = "";
}

// Função de concluir tarefa
function concluirTarefa(pessoa, dia, index) {
  if (pessoas[pessoa] && pessoas[pessoa][dia] && pessoas[pessoa][dia][index]) {
    pessoas[pessoa][dia][index].concluida = !pessoas[pessoa][dia][index].concluida;
    renderizarTarefas();
    atualizarContador();
  }
}

// Função de remover tarefa
function removerTarefa(pessoa, dia, index) {
  if (pessoas[pessoa] && pessoas[pessoa][dia]) {
    pessoas[pessoa][dia].splice(index, 1);

    if (pessoas[pessoa][dia].length === 0) {
      delete pessoas[pessoa][dia];
    }
    if (Object.keys(pessoas[pessoa]).length === 0) {
      delete pessoas[pessoa];
    }

    renderizarTarefas();
    atualizarContador();
  }
}

// Função de atualizar contador
function atualizarContador() {
  let totalPendentes = 0;
  let totalConcluidas = 0;

  for (const dias of Object.values(pessoas)) {
    for (const tarefas of Object.values(dias)) {
      totalPendentes += tarefas.filter(t => !t.concluida).length;
      totalConcluidas += tarefas.filter(t => t.concluida).length;
    }
  }

  document.getElementById("contador").innerText = 
    `Pendentes: ${totalPendentes} | Concluídas: ${totalConcluidas}`;
}

// Função de renderizar tarefas
function renderizarTarefas() {
  const container = document.getElementById('tarefas-container');
  container.innerHTML = '';

  const ordemDias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
  const nomesDias = {
    'segunda': 'Segunda',
    'terca': 'Terça',
    'quarta': 'Quarta',
    'quinta': 'Quinta',
    'sexta': 'Sexta',
    'sabado': 'Sábado',
    'domingo': 'Domingo'
  };

  for (const pessoa in pessoas) {
    const pessoaDiv = document.createElement('div');
    pessoaDiv.className = 'pessoa-container';
    pessoaDiv.innerHTML = `<h2>Usuário: ${pessoa}</h2>`;
    container.appendChild(pessoaDiv);

    ordemDias.forEach(dia => {
      if (pessoas[pessoa][dia] && pessoas[pessoa][dia].length > 0) {
        const diaDiv = document.createElement('div');
        diaDiv.className = 'dia-container';
        diaDiv.innerHTML = `<h3>${nomesDias[dia]}</h3>`;
        pessoaDiv.appendChild(diaDiv);

        pessoas[pessoa][dia].forEach((tarefa, index) => {
          const tarefaDiv = document.createElement('div');
          tarefaDiv.className = 'tarefa-item';
          if (tarefa.concluida) {
            tarefaDiv.classList.add('concluida');
          }
          tarefaDiv.innerHTML = `
            <span class="tarefa-texto">${tarefa.texto}</span>
            <div class="tarefa-botoes">
              <button onclick="concluirTarefa('${pessoa}', '${dia}', ${index})" class="btn-concluir">
                ${tarefa.concluida ? 'Desfazer' : 'Concluir'}
              </button>
              <button onclick="removerTarefa('${pessoa}', '${dia}', ${index})" class="btn-remover">Remover</button>
            </div>
          `;
          diaDiv.appendChild(tarefaDiv);
        });
      }
    });
  }
}



function filtrarTarefas() {
  const filtroNome = document.getElementById("filtroNome").value.toLowerCase();
  const filtroDescricao = document.getElementById("filtroDescricao").value.toLowerCase();
  const container = document.getElementById('tarefas-container');
  container.innerHTML = '';
  
  const ordemDias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
  const nomesDias = {
    'segunda': 'Segunda',
    'terca': 'Terça',
    'quarta': 'Quarta',
    'quinta': 'Quinta',
    'sexta': 'Sexta',
    'sabado': 'Sábado',
    'domingo': 'Domingo'
  };

  // Verificar se há algum filtro ativo
  const filtroAtivo = filtroNome !== '' || filtroDescricao !== '';

  for (const pessoa in pessoas) {
    const nomeCorresponde = pessoa.toLowerCase().includes(filtroNome);
    let pessoaTemTarefasFiltradas = false;
    
    // Criar container da pessoa apenas se não houver filtro ativo
    const pessoaDiv = document.createElement('div');
    pessoaDiv.className = 'pessoa-container';
    
    if (!filtroAtivo) {
      pessoaDiv.innerHTML = `<h2>Usuário: ${pessoa}</h2>`;
    }

    ordemDias.forEach(dia => {
      if (pessoas[pessoa][dia] && pessoas[pessoa][dia].length > 0) {
        const diaDiv = document.createElement('div');
        diaDiv.className = 'dia-container';
        let diaTemTarefasFiltradas = false;
        
        pessoas[pessoa][dia].forEach((tarefa, index) => {
          const descricaoCorresponde = tarefa.texto.toLowerCase().includes(filtroDescricao);
          
          // Mostrar tarefa se não houver filtro ou se corresponder aos filtros
          if (!filtroAtivo || (nomeCorresponde && descricaoCorresponde)) {
            if (!diaTemTarefasFiltradas) {
              if (!filtroAtivo) {
                diaDiv.innerHTML = `<h3>${nomesDias[dia]}</h3>`;
              } else {
              }
              pessoaDiv.appendChild(diaDiv);
              diaTemTarefasFiltradas = true;
              pessoaTemTarefasFiltradas = true;
            }
            
            const tarefaDiv = document.createElement('div');
            tarefaDiv.className = 'tarefa-item';
            if (tarefa.concluida) {
              tarefaDiv.classList.add('concluida');
            }
            
            if (filtroAtivo) {
              // Modo filtro: mostrar apenas a tarefa
              tarefaDiv.innerHTML = `
                <span class="tarefa-texto">${tarefa.texto}</span>
                <div class="tarefa-botoes">
                  <button onclick="concluirTarefa('${pessoa}', '${dia}', ${index})" class="btn-concluir">
                    ${tarefa.concluida ? 'Desfazer' : 'Concluir'}
                  </button>
                  <button onclick="removerTarefa('${pessoa}', '${dia}', ${index})" class="btn-remover">Remover</button>
                </div>
              `;
            } else {
              // Modo normal: mostrar estrutura completa
              tarefaDiv.innerHTML = `
                <span class="tarefa-texto">${tarefa.texto}</span>
                <div class="tarefa-botoes">
                  <button onclick="concluirTarefa('${pessoa}', '${dia}', ${index})" class="btn-concluir">
                    ${tarefa.concluida ? 'Desfazer' : 'Concluir'}
                  </button>
                  <button onclick="removerTarefa('${pessoa}', '${dia}', ${index})" class="btn-remover">Remover</button>
                </div>
              `;
            }
            diaDiv.appendChild(tarefaDiv);
          }
        });
      }
    });

    if ((!filtroAtivo && Object.keys(pessoas[pessoa]).length > 0) || 
        (filtroAtivo && pessoaTemTarefasFiltradas)) {
      container.appendChild(pessoaDiv);
    }
  }
  atualizarContador();
}

document.getElementById("btnAdicionar").addEventListener("click", adicionarTarefa);
// eventos para filtro
document.getElementById("filtroNome").addEventListener("input", filtrarTarefas);
document.getElementById("filtroDescricao").addEventListener("input", filtrarTarefas);