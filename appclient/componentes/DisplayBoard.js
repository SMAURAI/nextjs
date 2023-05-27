import React from 'react'

export const DisplayBoard = ({numeroCursos, obterTodosCursos}) => {
    
    return(
        <div className="display-board">
            <h4>Cursos Criados</h4>
            <div className="number">
            {numeroCursos}
            </div>
            <div className="btn">
                <button type="button" onClick={(e) => obterTodosCursos()} className="btn btn-warning">Obter todos cursos</button>
            </div>
        </div>
    )
}