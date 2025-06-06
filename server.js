const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Dados armazenados na memória
let usuarios = [];

// Configurações
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Página com formulário
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// Página para mostrar a lista de usuários
app.get('/usuarios', (req, res) => {
  let html = `
    <h1>Usuários Cadastrados</h1>
    <ul>
  `;

  usuarios.forEach((u) => {
    html += `<li>${u.nome} - ${u.email} - ${u.idade} anos</li>`;
  });

  html += `</ul><a href="/">Voltar</a>`;
  res.send(html);
});

// Rota para salvar o usuário vindo do formulário
app.post('/cadastrar', (req, res) => {
  const { nome, email, idade } = req.body;

  // Validação simples
  if (!nome || !email || !idade) {
    return res.send('Todos os campos são obrigatórios! <a href="/">Voltar</a>');
  }

  usuarios.push({ nome, email, idade });
  res.redirect('/usuarios');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
 
