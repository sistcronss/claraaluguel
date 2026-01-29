# Clara Aluguel - Sistema de Gestão de Aluguel e Venda de Roupas

## 📋 Descrição

Sistema web completo para gerenciamento de uma loja de aluguel e venda de roupas (vestidos, ternos, bolsas e acessórios). Inclui controle de reservas, estoque, clientes, funcionários, pagamentos, caixa e relatórios.

## 🏗️ Arquitetura

### Backend
- **Framework**: Node.js + Express
- **Banco de Dados**: PostgreSQL + Sequelize ORM
- **Autenticação**: JWT (JSON Web Tokens)
- **Arquitetura**: Controller → Service → Repository

### Frontend
- **Framework**: React 18
- **Estilos**: Tailwind CSS
- **HTTP Client**: Axios
- **Roteamento**: React Router v6

## 📦 Requisitos

- Node.js v14+
- PostgreSQL 12+
- npm ou yarn

## 🚀 Instalação

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env com suas credenciais PostgreSQL
npm run migrate
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 🔑 Credenciais Padrão

**Admin:**
- Login: `admin`
- Senha: `admin123`

**Funcionário:**
- Login: `funcionario1`
- Senha: `func123`

## 📚 Estrutura do Projeto

```
Clara Aluguel/
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações (BD, etc)
│   │   ├── controllers/     # Controladores
│   │   ├── services/        # Lógica de negócio
│   │   ├── repositories/    # Acesso a dados
│   │   ├── models/          # Modelos Sequelize
│   │   ├── migrations/      # Migrações do BD
│   │   ├── middlewares/     # Middlewares Express
│   │   ├── routes/          # Rotas da API
│   │   ├── utils/           # Utilitários
│   │   └── index.js         # Arquivo principal
│   ├── seeders/             # Seeds de dados
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas
│   │   ├── services/        # Serviços de API
│   │   ├── contexts/        # Context API
│   │   ├── styles/          # Estilos globais
│   │   └── App.jsx
│   └── package.json
└── docs/                    # Documentação
```

## 🔌 API Endpoints

### Autenticação
- `POST /api/auth/login` - Realizar login

### Funcionários
- `GET /api/employees` - Listar
- `GET /api/employees/:id` - Obter por ID
- `POST /api/employees` - Criar (admin)
- `PUT /api/employees/:id` - Atualizar (admin)
- `DELETE /api/employees/:id` - Deletar (admin)

### Clientes
- `GET /api/customers` - Listar
- `GET /api/customers/:id` - Obter por ID
- `GET /api/customers/:id/history` - Histórico de reservas e compras
- `POST /api/customers` - Criar
- `PUT /api/customers/:id` - Atualizar
- `DELETE /api/customers/:id` - Deletar

### Peças
- `GET /api/pieces` - Listar
- `GET /api/pieces/:id` - Obter por ID
- `GET /api/pieces/code/:code` - Obter por código
- `GET /api/pieces/sector/:sectorId` - Listar por setor
- `GET /api/pieces/stock/status` - Status do estoque
- `POST /api/pieces` - Criar
- `PUT /api/pieces/:id` - Atualizar
- `PATCH /api/pieces/:id/status` - Alterar status
- `DELETE /api/pieces/:id` - Deletar

### Setores
- `GET /api/sectors` - Listar
- `GET /api/sectors/:id` - Obter por ID
- `POST /api/sectors` - Criar (admin)
- `PUT /api/sectors/:id` - Atualizar (admin)
- `DELETE /api/sectors/:id` - Deletar (admin)

### Reservas
- `GET /api/reservations` - Listar
- `GET /api/reservations/:id` - Obter por ID
- `POST /api/reservations` - Criar
- `PUT /api/reservations/:id` - Atualizar
- `PATCH /api/reservations/:id/cancel` - Cancelar
- `PATCH /api/reservations/:id/complete` - Completar
- `DELETE /api/reservations/:id` - Deletar

### Pagamentos
- `GET /api/payments` - Listar
- `GET /api/payments/:id` - Obter por ID
- `POST /api/payments` - Criar
- `PUT /api/payments/:id` - Atualizar
- `PATCH /api/payments/:id/record` - Registrar pagamento
- `DELETE /api/payments/:id` - Deletar

### Vendas
- `GET /api/sales` - Listar
- `GET /api/sales/:id` - Obter por ID
- `GET /api/sales/customer/:customerId` - Vendas de um cliente
- `POST /api/sales` - Criar venda
- `PUT /api/sales/:id` - Atualizar
- `DELETE /api/sales/:id` - Deletar

### Caixa
- `POST /api/cashier` - Abrir caixa
- `GET /api/cashier` - Listar todos
- `GET /api/cashier/today` - Caixa aberto hoje
- `GET /api/cashier/:id` - Obter por ID
- `GET /api/cashier/date/:date` - Obter por data
- `PATCH /api/cashier/:id/rental-income` - Adicionar entrada de aluguel
- `PATCH /api/cashier/:id/sale-income` - Adicionar entrada de venda
- `PATCH /api/cashier/:id/expense` - Adicionar despesa
- `PATCH /api/cashier/:id/close` - Fechar caixa

### Relatórios
- `GET /api/reports/monthly-revenue/:month/:year` - Receita mensal
- `GET /api/reports/reservations-period` - Reservas por período
- `GET /api/reports/most-rented` - Peças mais alugadas
- `GET /api/reports/sold-pieces` - Peças vendidas
- `GET /api/reports/frequent-customers` - Clientes frequentes
- `GET /api/reports/pending-payments` - Pagamentos em aberto
- `GET /api/reports/stock` - Relatório de estoque

## 🔐 Permissões

- **Admin**: Acesso completo ao sistema
- **Funcionário**: Acesso à maioria dos módulos (sem gerenciar usuários)

## 📝 Variáveis de Ambiente (.env)

```
NODE_ENV=development
PORT=3001

DB_HOST=localhost
DB_PORT=5432
DB_NAME=clara_aluguel_db
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=7d

LOG_LEVEL=info
```

## 🗄️ Banco de Dados

### Tabelas Principais
- `users` - Usuários do sistema
- `employees` - Funcionários
- `customers` - Clientes
- `sectors` - Setores (Vestidos, Ternos)
- `pieces` - Peças de roupa
- `reservations` - Reservas
- `payments` - Pagamentos
- `sales` - Vendas
- `cashiers` - Caixa diário

## ✨ Funcionalidades

### ✅ Implementadas
- Autenticação com JWT
- CRUD completo de todos os módulos
- Validação de dupla reserva
- Gestão de estoque por status
- Sistema de pagamento com parcelamento
- Gestão de caixa (abertura/fechamento)
- Relatórios de vendas, receitas e estoque
- Histórico de clientes
- Logs de operações

### 🎯 Próximas Versões
- Dashboard com gráficos
- App mobile com React Native
- Notificações por email/SMS
- Integração com sistemas de pagamento
- Geração de PDF (contratos, cupons)

## 🚢 Deploy

### Preparação
1. Clonar repositório
2. Instalar dependências
3. Configurar variáveis de ambiente
4. Criar banco de dados PostgreSQL
5. Executar migrations: `npm run migrate`
6. Executar seeds: `npm run seed`

### Docker (Opcional)
```bash
docker-compose up -d
```

### Production
```bash
npm run build
npm run start
```

## 📞 Suporte

Para relatórios de bugs ou sugestões, abra uma issue no repositório.

## 📄 Licença

MIT License

---

**Clara Aluguel** - Sistema desenvolvido com ❤️ para facilitar a gestão de lojas de aluguel de roupas.
