import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FiLogOut, FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold">
            🎀 Clara Aluguel
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            <FiMenu size={24} />
          </button>

          <div className={`${menuOpen ? 'block' : 'hidden'} md:block md:flex gap-6`}>
            <Link to="/dashboard" className="hover:opacity-80 transition">
              Dashboard
            </Link>
            <Link to="/customers" className="hover:opacity-80 transition">
              Clientes
            </Link>
            <Link to="/pieces" className="hover:opacity-80 transition">
              Peças
            </Link>
            <Link to="/reservations" className="hover:opacity-80 transition">
              Reservas
            </Link>
            <Link to="/payments" className="hover:opacity-80 transition">
              Pagamentos
            </Link>
            {isAdmin && (
              <Link to="/employees" className="hover:opacity-80 transition">
                Funcionários
              </Link>
            )}
            <Link to="/reports" className="hover:opacity-80 transition">
              Relatórios
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm">{user?.login}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <FiLogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
