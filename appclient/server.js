//Sessão de chamada dos métodos express, next e middleware
const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require("http-proxy-middleware")

//Define as variáveis de ambiente, tais como porta, e o node do servidor
//Porta do cliente
const port = process.env.PORT || 80
//Ambiente de nó para execução
//Pode ser de ambiente de desenvolvimento e de produção
//Ambiente de desenvolvimento: quando o desenvolvedor está implementando o sistema
//Ambiente de produção: quando o sistema está implementado e pronto para uso
//Nesse caso, o ambiente é diferente do ambiente de produção
//Logo, entendemos que ele é um ambiente de desenvolvimento
const dev = process.env.NODE_ENV !== 'production'
//O método next() é usado para inicializar a instância do servidor next.js
//o modo de desenvolvimento será ativado se 'dev' for true
//Isso quer dizer que se tem o dev no código, então ele está no modo de desenvolvimento?
const app = next({ dev })
//O getRequestHandler() é um método fornecido pela instância do Next()
//Ele é utilizado para direcionar as solicitações que não correspondam as rotas definidas no servidor
const handle = app.getRequestHandler()

//Em apiPaths é definido a rota das api's configuradas no servidor Node.js
const apiPaths = {
    '/api': {
        //A target indica o endereço do servidor Node.js que está sendo integrado
        target: 'http://localhost:8080', 
        pathRewrite: {
            '^/api': '/api'
        },
        changeOrigin: true
    }
}

const isDevelopment = process.env.NODE_ENV !== 'production'

app.prepare().then(() => {
  //A constante server recebe os instrumentos do método express
  const server = express()
 
  if (isDevelopment) {
    //server.use() é um método do Express.js que permite adicionar middleware ao servidor para tratar diferentes tipos de solicitações
    //createProxyMiddleware() é uma função fornecida pela biblioteca http-proxy-middleware que cria um middleware de proxy para redirecionar as solicitações para o destino desejado
    //Permite que você separe suas APIs em um servidor ou serviço separado, mantendo a lógica do cliente e do servidor separada
    server.use('/api', createProxyMiddleware(apiPaths['/api']));
  }

  server.all('*', (req, res) => {
    //envia todas as solicitações para o recurso do handler
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(err => {
    console.log('Error:::::', err)
})