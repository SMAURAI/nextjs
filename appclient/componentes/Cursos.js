import React from 'react'
import { deletecurso, alterarCurso } from '../services/CursoService'

export const Cursos = ({cursos}) => {

    //Apresenta a quantidade de cursos que está cadastrada no banco de dados
    console.log('cursos length:::', cursos.length)
    if (cursos.length === 0) return null

    //A função CursoRow recebe o nome do curso e o indice
    const CursoRow = (curso,index) => {
        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index + 1}</td>
                  <td>{curso.nome}</td>
                  <td><button type="button" onClick={() => deletecurso(curso.id)} className="btn btn-danger">Apagar</button>
                      <button type="button" onClick={() => alterarCurso(curso.id)} className="btn btn-danger">Alterar</button>
                  </td>
              </tr>
        )
    }

    //Função para formação da tabela de cursos
    const CursoTable = cursos.map((curso,index) => CursoRow(curso,index))

    return(
        <div className="container">
            <h2>Cursos</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Curso Id</th>
                    <th>Nome</th>
                    <th>Ferramentas</th>
                </tr>
                </thead>
                <tbody>
                    {CursoTable}
                </tbody>
            </table>
        </div>
    )
}