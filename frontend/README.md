# Clara Aluguel - Frontend React

## 📋 Descrição

Interface web responsiva para o Sistema Clara Aluguel, construída com React 18, Tailwind CSS e Axios.

## 🛠️ Tecnologias

- **React 18** - Biblioteca para UI
- **React Router v6** - Roteamento
- **Tailwind CSS** - Estilos
- **Axios** - HTTP Client
- **React Icons** - Ícones

## 🚀 Como Executar

```bash
cd frontend
npm install
npm start
```

Acesse `http://localhost:3000`

## 📁 Estrutura

```
src/
├── components/         # Componentes reutilizáveis
├── pages/             # Páginas da aplicação
├── services/          # Serviços de API
├── contexts/          # Context API (autenticação)
├── styles/            # Estilos globais
├── App.jsx            # Componente principal
└── index.js           # Entrada
```

## 🔑 Credenciais Padrão

```
Admin: admin / admin123
Funcionário: funcionario1 / func123
```

## 🎨 Componentes Principais

- **ProtectedRoute** - Proteção de rotas
- **Navbar** - Barra de navegação
- **Modal** - Modal reutilizável
- **Alert** - Alertas/notificações
- **LoadingSpinner** - Carregamento

## 📄 Páginas Implementadas

- **LoginPage** - Autenticação
- **DashboardPage** - Resumo do sistema
- **CustomersPage** - Gestão de clientes
- **PiecesPage** - Gestão de peças
- **ReportsPage** - Relatórios e análises

## 🔌 Variáveis de Ambiente

```
REACT_APP_API_URL=http://localhost:3001/api
```

## 🚀 Build para Produção

```bash
npm run build
```

Gera a pasta `build/` otimizada para produção.

---

**Clara Aluguel Frontend** - Desenvolvido com React ⚛️
