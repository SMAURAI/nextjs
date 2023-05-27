import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './Header'
import { Cursos } from './Cursos'
import { DisplayBoard } from './DisplayBoard'
import CriarCurso from './CriarCurso'
import { obterTodosCursos, criarCurso } from '../services/CursoService'

class App extends Component {

  state = {
    nome: {},
    cursos: [],
    numeroCursos: 0
  }
  
  //Recebe a resposta de 'criarcurso.js'
  criarCurso=(e)=> {
    criarCurso(this.state.nome)
        .then(response => {
          console.log(response);
          this.setState({numeroCursos: this.state.numeroCursos + 1})
      });
  }

  //Recebe o valor do componente 'cursos.js' para manipulação
  obterTodosCursos=()=> {
    obterTodosCursos()
      .then(cursos => {
        console.log(cursos)
        this.setState({cursos: cursos, numeroCursos: cursos.length})
      });
  }

  //Valida que houve mudança no campo de formulário chamado nome
  onChangeForm = (e) => {
      let nome = this.state.nome
      if (e.target.name === 'nome') {
          nome = e.target.value;
      }
      this.setState({nome})
  }

  //Renderização da página que será lançada no aplicativo
  render() {
    
    return (
      <div className="App">
        <Header></Header>
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-8">
                <CriarCurso 
                  nome={this.state.nome}
                  onChangeForm={this.onChangeForm}
                  criarCurso={this.criarCurso}
                  >
                </CriarCurso>
            </div>
            <div className="col-md-4">
                <DisplayBoard
                  numeroCursos={this.state.numeroCursos}
                  obterTodosCursos={this.obterTodosCursos}
                >
                </DisplayBoard>
            </div>
          </div>
        </div>
        <div className="row mrgnbtm">
          <Cursos cursos={this.state.cursos}></Cursos>
        </div>
      </div>
    );
  }
}

export default App;

