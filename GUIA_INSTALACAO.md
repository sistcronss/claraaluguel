# Clara Aluguel - Guia de Instalação e Configuração

## 📋 Pré-Requisitos

- Node.js v18+ (v24 recomendado)
- PostgreSQL 12+
- Git (opcional)
- Postman/Insomnia (para testar API, opcional)

## 🗄️ 1. Configurar Banco de Dados PostgreSQL

### Windows

```bash
# Abrir o psql (PostgreSQL Command Line)
psql -U postgres

# Criar banco de dados
CREATE DATABASE clara_aluguel_db;

# Criar usuário (opcional, usar padrão postgres:postgres)
CREATE USER clara_user WITH PASSWORD 'sua_senha';
ALTER ROLE clara_user SET client_encoding TO 'utf8';
ALTER ROLE clara_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE clara_user SET default_transaction_deferrable TO on;
ALTER ROLE clara_user SET default_time_zone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE clara_aluguel_db TO clara_user;

# Sair
\q
```

### macOS/Linux

```bash
# Iniciar PostgreSQL
brew services start postgresql
# ou
sudo service postgresql start

# Criar banco
createdb clara_aluguel_db -U postgres

# Criar usuário (opcional)
psql -U postgres -c "CREATE USER clara_user WITH PASSWORD 'sua_senha';"
```

## 🔧 2. Configurar Backend

```bash
# Navegar para a pasta backend
cd backend

# Instalar dependências
npm install

# Copiar arquivo de configuração
cp .env.example .env

# Editar .env com suas credenciais
nano .env
# ou use seu editor preferido

# Exemplo de .env:
# NODE_ENV=development
# PORT=3001
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=clara_aluguel_db
# DB_USER=postgres
# DB_PASSWORD=postgres
# JWT_SECRET=sua_chave_secreta_super_segura
# JWT_EXPIRES_IN=7d

# Executar migrations
npm run migrate

# Popular banco com dados de exemplo
npm run seed

# Iniciar servidor
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

## 🎨 3. Configurar Frontend

```bash
# Abrir nova aba do terminal
cd frontend

# Instalar dependências
npm install

# Copiar arquivo de configuração (opcional)
cp .env.example .env

# Iniciar aplicação
npm start
```

A aplicação abrirá em `http://localhost:3000`

## 🔐 4. Fazer Login

Use as credenciais padrão:

**Admin:**
- Login: `admin`
- Senha: `admin123`

**Funcionário:**
- Login: `funcionario1`
- Senha: `func123`

## 📚 5. Estrutura de Pastas

```
Clara Aluguel/
│
├── backend/
│   ├── src/
│   │   ├── config/           # Configurações
│   │   ├── controllers/      # Controllers
│   │   ├── services/         # Lógica de negócio
│   │   ├── repositories/     # Acesso a dados
│   │   ├── models/           # Modelos Sequelize
│   │   ├── migrations/       # Migrações do BD
│   │   ├── middlewares/      # Middlewares
│   │   ├── routes/           # Rotas
│   │   ├── utils/            # Utilitários
│   │   ├── validators/       # Validadores
│   │   └── index.js          # Arquivo principal
│   ├── seeders/              # Dados iniciais
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── pages/            # Páginas
│   │   ├── services/         # Serviços de API
│   │   ├── contexts/         # Context API
│   │   ├── styles/           # Estilos
│   │   ├── App.jsx           # Componente raiz
│   │   └── index.js          # Entrada
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── .env.example
│   └── README.md
│
└── docs/
    └── README.md
```

## 🚀 Comandos Úteis

### Backend

```bash
# Desenvolvimento
npm run dev

# Production
npm start

# Migrations
npm run migrate       # Executar todas
npm run migrate:undo # Reverter última

# Seeds
npm run seed         # Executar
npm run seed:undo    # Reverter
```

### Frontend

```bash
# Desenvolvimento
npm start

# Build para produção
npm run build

# Testes
npm test
```

## 🐛 Troubleshooting

### Erro: "ECONNREFUSED" ao conectar ao banco

**Solução:**
- Verificar se PostgreSQL está rodando
- Confirmar credenciais em `.env`
- Verificar porta do banco (padrão 5432)

```bash
# Windows
pg_isready -h localhost -p 5432

# macOS/Linux
sudo service postgresql status
```

### Erro: "Porta já em uso"

**Solução:**
```bash
# Mudar PORT em .env
PORT=3002

# Ou matar processo
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3001
kill -9 <PID>
```

### Erro: "JWT_SECRET não definido"

**Solução:**
- Certifique-se de que `.env` está correto
- Gere uma chave segura:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend não conecta ao backend

**Solução:**
- Confirmar que backend está rodando (porta 3001)
- Verificar `REACT_APP_API_URL` em `.env`
- Limpar cache do navegador
- Reiniciar servidor frontend

## 📱 Acessar em Outro Computador

### Backend
1. Editar `.env` e trocar `localhost` pelo IP da máquina
2. Ou usar `0.0.0.0` para aceitar conexões externas

### Frontend
1. Editar `.env`:
```
REACT_APP_API_URL=http://SEU_IP:3001/api
```

2. Executar:
```bash
npm start -- --host 0.0.0.0
```

## 🔄 Resetar Tudo

```bash
# Backend
npm run migrate:undo    # Desfazer todas as migrations
npm run migrate         # Recriar tabelas
npm run seed           # Repovoar dados

# Frontend
rm -rf node_modules
npm install
npm start
```

## 📖 Documentação da API

Acesse [localhost:3001/api/health](http://localhost:3001/api/health) para verificar se o servidor está rodando.

### Exemplos de Requisições

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","password":"admin123"}'

# Listar clientes (requer token)
curl http://localhost:3001/api/customers \
  -H "Authorization: Bearer YOUR_TOKEN"

# Criar cliente
curl -X POST http://localhost:3001/api/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"João Silva","phone":"11999999999"}'
```

## 🚢 Deploy

### Preparação para Produção

```bash
# Backend - Build
npm run build

# Frontend - Build
npm run build

# Usar variáveis de ambiente de produção
NODE_ENV=production npm start
```

### Deploy com Docker (Opcional)

Será adicionado em versão futura.

## 📞 Suporte

Para problemas ou dúvidas:
1. Verificar este guia
2. Consultar README.md de cada pasta
3. Abrir uma issue no repositório

---

**Clara Aluguel** - Sistema de Gestão de Aluguel e Venda de Roupas ✨
