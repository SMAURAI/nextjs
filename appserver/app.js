const bancodados = require('./conexao');
const express = require('express');
const body = require('body-parser');

const app = express();

app.use(body.json());

//Link de acesso ao sobre a página: http://localhost/sobre/
//Envio de informações configuradas
app.get('/sobre', async(req, res) => {
   res.send("Página inicial do projeto Payroll - Inovar para Pessoas Negras");
});

//Link de acesso a página principal: http://localhost/
//Envio de informações disponíveis em um banco de dados via GET
app.get('/api/cursos', async(req, res) => {
    const consulta = "select * from CURSO";
 
    bancodados.query(consulta, function(err, result){
       if (err){
          console.log(err);
       }else{
 
          res.send(result);
       }
    });
});

//Link de acesso a determinada informação do DB: http://localhost/:id
//Acesso as informações via GET com Filtro por ID
app.get('/api/cursos/:id', async(req, res) => {
    const consulta = "select * from CURSO where id = ?";
 
    bancodados.query(consulta, [req.params.id] ,function(err, result){
       if (err){
          console.log(err);
       }else{
 
          res.send(result);
       }
    });
});

//Método POST
app.post('/api/cursos/inserir', async(req, res) => {
    const inserir = "INSERT INTO CURSO SET nome = ?";
 
    const body = req.body;
 
    bancodados.query(inserir, [body.nome] ,function(err, result){
       if (err){
          console.log(err);
       }else{
 
          res.send(result);
       }
    });
});

//Método PUT
app.put('/api/cursos/alterar/:id', async(req, res) => {
   const alterar = "UPDATE CURSO SET nome = ? where id = ?";

   bancodados.query(alterar, [req.body.nome, req.params.id] ,function(err, result){
      if (err){
         console.log(err);
      }else{

         res.send(result);
      }
   });
});

//Método DELETE
app.delete('/api/cursos/delete/:id', async(req, res) => {
    const del = "DELETE from CURSO where id = ?";
 
    bancodados.query(del, [req.params.id] ,function(err, result){
       if (err){
          console.log(err);
       }else{
 
          res.send(result);
       }
    });
}); 

//Método para escuta de requisições por link
app.listen(8080, () => {
   console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
