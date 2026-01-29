=======
# 🎀 Clara Aluguel - Sistema de Gestão Completo

> **Sistema Web Profissional** para gerenciar loja de aluguel e venda de roupas, vestidos, ternos, bolsas e acessórios.

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Características Principais

### ✅ Módulos Implementados

- **🔐 Autenticação** - Login seguro com JWT
- **👥 Funcionários** - Gestão de equipe com permissões
- **👤 Clientes** - Cadastro, CPF, telefone, endereço, histórico
- **👗 Peças** - Gestão de inventário (vestidos, ternos, bolsas, acessórios)
- **🏢 Setores** - Organização em Vestidos e Ternos
- **📅 Reservas** - Sistema de reserva com validação de conflitos
- **💳 Pagamentos** - Múltiplas formas, parcelamento, controle de status
- **🛍️ Vendas** - Conversão de peças em aluguel para venda
- **💰 Caixa** - Abertura/fechamento diário com entradas e saídas
- **📊 Relatórios** - Análise de receita, peças mais alugadas, clientes frequentes
- **📈 Dashboard** - Visão geral do sistema com KPIs

### 🔒 Segurança

- Autenticação JWT com expiração
- Senhas com hash bcrypt
- Controle de permissões (Admin/Funcionário)
- Validação de formulários
- Tratamento de erros robusto

### 📱 Responsividade

- Interface totalmente responsiva
- Desktop, tablet e mobile
- Navegação intuitiva
- Componentes reutilizáveis

---

## 🏗️ Arquitetura

### Backend
- **Node.js + Express** - API REST modular
- **PostgreSQL** - Banco de dados relacional
- **Sequelize ORM** - Mapeamento objeto-relacional
- **Camadas**: Controller → Service → Repository

### Frontend
- **React 18** - Componentes modernos
- **React Router v6** - Roteamento dinâmico
- **Tailwind CSS** - Estilos responsivos
- **Axios** - Requisições HTTP com interceptadores
- **Context API** - Gerenciamento de estado

---

## 📦 Requisitos

- **Node.js** v14+
- **PostgreSQL** 12+
- **npm** ou **yarn**

---

## 🚀 Início Rápido

### 1️⃣ Clone ou Extraia o Projeto

```bash
cd "Clara Aluguel"
```

### 2️⃣ Configure o Banco de Dados

```bash
# PostgreSQL
psql -U postgres -c "CREATE DATABASE clara_aluguel_db;"
```

### 3️⃣ Configure e Inicie o Backend

```bash
cd backend
npm install
cp .env.example .env
# Edite .env com suas credenciais
npm run migrate
npm run seed
npm run dev
```

Backend rodando em: `http://localhost:3001`

### 4️⃣ Configure e Inicie o Frontend

```bash
cd frontend
npm install
npm start
```

Frontend rodando em: `http://localhost:3000`

### 5️⃣ Faça Login

```
Admin: admin / admin123
Funcionário: funcionario1 / func123
```

---

## 📚 Documentação

- [GUIA_INSTALACAO.md](./GUIA_INSTALACAO.md) - Instalação passo a passo
- [backend/README.md](./backend/README.md) - Documentação da API
- [frontend/README.md](./frontend/README.md) - Documentação do Frontend

---

## 🗂️ Estrutura do Projeto

```
Clara Aluguel/
│
├── backend/                    # API REST Node.js/Express
│   ├── src/
│   │   ├── config/            # Configurações
│   │   ├── controllers/       # Controladores
│   │   ├── services/          # Lógica de negócio
│   │   ├── repositories/      # Acesso a dados
│   │   ├── models/            # Modelos Sequelize
│   │   ├── migrations/        # Migrações BD
│   │   ├── middlewares/       # Autenticação, erros
│   │   ├── routes/            # Rotas da API
│   │   ├── utils/             # Utilitários
│   │   └── index.js           # Servidor principal
│   ├── seeders/               # Dados iniciais
│   ├── package.json
│   └── README.md
│
├── frontend/                   # Interface React
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── services/          # Chamadas de API
│   │   ├── contexts/          # Context API (Auth)
│   │   ├── styles/            # Estilos CSS
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── docs/                       # Documentação adicional
├── GUIA_INSTALACAO.md         # Guia de instalação
└── README.md                  # Este arquivo
```

---

## 🔌 API Endpoints

### Autenticação
```
POST   /api/auth/login
```

### Funcionários
```
GET    /api/employees
POST   /api/employees         (Admin)
GET    /api/employees/:id
PUT    /api/employees/:id     (Admin)
DELETE /api/employees/:id     (Admin)
```

### Clientes
```
GET    /api/customers
POST   /api/customers
GET    /api/customers/:id
GET    /api/customers/:id/history
PUT    /api/customers/:id
DELETE /api/customers/:id
```

### Peças
```
GET    /api/pieces
POST   /api/pieces
GET    /api/pieces/:id
GET    /api/pieces/code/:code
GET    /api/pieces/sector/:sectorId
GET    /api/pieces/stock/status
PATCH  /api/pieces/:id/status
```

### Setores
```
GET    /api/sectors
POST   /api/sectors           (Admin)
GET    /api/sectors/:id
PUT    /api/sectors/:id       (Admin)
DELETE /api/sectors/:id       (Admin)
```

### Reservas
```
GET    /api/reservations
POST   /api/reservations
GET    /api/reservations/:id
PUT    /api/reservations/:id
PATCH  /api/reservations/:id/cancel
PATCH  /api/reservations/:id/complete
DELETE /api/reservations/:id
```

### Pagamentos
```
GET    /api/payments
POST   /api/payments
GET    /api/payments/:id
PUT    /api/payments/:id
PATCH  /api/payments/:id/record
DELETE /api/payments/:id
```

### Vendas
```
GET    /api/sales
POST   /api/sales
GET    /api/sales/:id
GET    /api/sales/customer/:customerId
PUT    /api/sales/:id
DELETE /api/sales/:id
```

### Caixa
```
POST   /api/cashier
GET    /api/cashier
GET    /api/cashier/today
GET    /api/cashier/:id
GET    /api/cashier/date/:date
PATCH  /api/cashier/:id/rental-income
PATCH  /api/cashier/:id/sale-income
PATCH  /api/cashier/:id/expense
PATCH  /api/cashier/:id/close
```

### Relatórios
```
GET    /api/reports/monthly-revenue/:month/:year
GET    /api/reports/reservations-period
GET    /api/reports/most-rented
GET    /api/reports/sold-pieces
GET    /api/reports/frequent-customers
GET    /api/reports/pending-payments
GET    /api/reports/stock
```

---

## 🗄️ Banco de Dados

### Tabelas

| Tabela | Descrição |
|--------|-----------|
| `users` | Usuários do sistema |
| `employees` | Funcionários |
| `customers` | Clientes |
| `sectors` | Setores (Vestidos, Ternos) |
| `pieces` | Peças de roupa |
| `reservations` | Reservas de peças |
| `payments` | Pagamentos |
| `sales` | Vendas |
| `cashiers` | Caixa diário |

---

## 🎨 Páginas Implementadas

### Frontend
- ✅ **Login** - Autenticação de usuários
- ✅ **Dashboard** - Resumo executivo
- ✅ **Clientes** - CRUD completo
- ✅ **Peças** - Gestão de inventário
- ✅ **Relatórios** - Análises e gráficos

### Próximas Versões
- 🔄 Reservas - Interface completa
- 🔄 Pagamentos - Dashboard de cobranças
- 🔄 Vendas - Histórico de vendas
- 🔄 Caixa - Fluxo de caixa
- 🔄 Funcionários - Gestão de equipe

---

## 🔐 Permissões

### Admin
- ✅ Gerenciar funcionários
- ✅ Gerenciar setores
- ✅ Acesso a todos os módulos
- ✅ Gerar relatórios
- ✅ Fechar caixa

### Funcionário
- ✅ Visualizar clientes
- ✅ Criar/editar reservas
- ✅ Registrar pagamentos
- ✅ Registrar vendas
- ✅ Abrir caixa
- ❌ Gerenciar usuários
- ❌ Alterar configurações

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **PostgreSQL** - Banco de dados
- **Sequelize** - ORM
- **JWT** - Autenticação
- **bcrypt** - Hashing de senhas
- **Axios** - HTTP client
- **CORS** - Compartilhamento de recursos

### Frontend
- **React** - UI library
- **React Router** - Roteamento
- **Tailwind CSS** - Framework CSS
- **Axios** - HTTP client
- **React Icons** - Biblioteca de ícones
- **Context API** - State management

---

## 📊 Dados de Exemplo

Sistema vem com seed contendo:

- **2 Setores**: Vestidos, Ternos
- **2 Usuários**: admin, funcionario1
- **2 Clientes**: Maria Santos, José Costa
- **4 Peças**: Vestido noiva, Vestido festa, Terno, Bolsa

---

## 🚀 Deploy

### Build para Produção

**Backend:**
```bash
cd backend
npm install --production
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Servir com nginx, apache, ou serviço estático
```

### Variáveis de Ambiente Produção

```
NODE_ENV=production
PORT=3001
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=chave_segura_com_32_caracteres
```

---

## 🐛 Troubleshooting

### Backend não conecta ao banco
- Verificar se PostgreSQL está rodando
- Confirmar credenciais em `.env`
- Testar conexão: `psql -U postgres -d clara_aluguel_db`

### Frontend não conecta ao backend
- Backend está rodando? `npm run dev`
- Verificar `REACT_APP_API_URL` em `.env`
- Limpar cache: `Ctrl+Shift+Del` ou `Cmd+Shift+Del`

### Porta já em uso
```bash
# Mudar em .env ou
lsof -i :3001
kill -9 <PID>
```

---

## 📝 Exemplo de Uso

### 1. Login
```bash
POST /api/auth/login
{
  "login": "admin",
  "password": "admin123"
}
```

### 2. Criar Cliente
```bash
POST /api/customers
Authorization: Bearer token
{
  "name": "João Silva",
  "cpf": "12345678901",
  "phone": "11999999999"
}
```

### 3. Criar Reserva
```bash
POST /api/reservations
Authorization: Bearer token
{
  "customerId": "uuid",
  "pieceId": "uuid",
  "sectorId": "uuid",
  "withdrawalDate": "2024-02-15",
  "returnDate": "2024-02-20"
}
```

---

## 🤝 Contribuições

Sistema aberto para melhorias. Sugestões:
- [ ] Mobile app com React Native
- [ ] Integração com sistemas de pagamento
- [ ] Geração de PDF/relatórios
- [ ] SMS/Email notifications
- [ ] Gráficos avançados
- [ ] Cache com Redis
- [ ] Testes automatizados

---

## 📄 Licença

MIT License - Use livremente em projetos pessoais ou comerciais

---

## 👨‍💻 Desenvolvido com

- **Node.js & Express** - Backend robusto
- **React** - Frontend moderno
- **PostgreSQL** - Banco profissional
- **Tailwind CSS** - Estilos limpos

---

## 📞 Suporte

1. Consultar [GUIA_INSTALACAO.md](./GUIA_INSTALACAO.md)
2. Verificar README de cada módulo
3. Revisar logs do servidor

---

## 🎯 Roadmap

### v1.0 (Atual)
- ✅ CRUD de todos os módulos
- ✅ Autenticação e permissões
- ✅ Relatórios básicos
- ✅ Dashboard

### v2.0 (Planejado)
- 🔄 Mobile app
- 🔄 Gráficos avançados
- 🔄 Integração de pagamentos
- 🔄 Notificações

---

## ⭐ Destaques

```
🎀 Clara Aluguel - Sistema Profissional
├── ✅ Pronto para produção
├── ✅ Código limpo e modular
├── ✅ Documentação completa
├── ✅ Interface intuitiva
├── ✅ Dados de exemplo
└── ✅ Deploy facilitado
```

---

**Clara Aluguel** - Transformando a Gestão de Lojas de Aluguel ✨

Desenvolvido com ❤️ para facilitar o gerenciamento do seu negócio.

---

*Última atualização: Janeiro de 2026*
>>>>>>> 40beaf8 (clara)
