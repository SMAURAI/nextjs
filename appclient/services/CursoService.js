//Método GET
export async function obterTodosCursos() {
  const response = await fetch('/api/cursos');
  return await response.json();
}

//Método POST
export async function criarCurso(data) {
  const response = await fetch('/api/cursos/inserir/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"nome": data})
    })
  return await response.json();
}

//Método DELETE
//As requisições de delete são realizadas direto no endereço do link
export async function deletecurso(data){
  const response = await fetch('/api/cursos/delete/' + data, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      })
  obterTodosCursos();
  return await response.json();
}

//Método PUT
export async function alterarCurso(id) {
  const novoNome = window.prompt('Digite o novo nome:', '');
  const response = await fetch('/api/cursos/alterar/' + id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"nome": novoNome})
    })
  return await response.json();
}