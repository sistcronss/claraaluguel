import React, { useEffect, useState } from 'react';
import { customerService } from '../services';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import Modal from '../components/Modal';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    birthDate: '',
    phone: '',
    address: '',
    cep: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await customerService.getAll();
      setCustomers(response.data.data);
    } catch (err) {
      setError('Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (customer = null) => {
    if (customer) {
      setEditingId(customer.id);
      setFormData(customer);
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        cpf: '',
        birthDate: '',
        phone: '',
        address: '',
        cep: '',
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await customerService.update(editingId, formData);
        setError('');
      } else {
        await customerService.create(formData);
      }
      fetchCustomers();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar cliente');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
      try {
        await customerService.delete(id);
        fetchCustomers();
      } catch (err) {
        setError('Erro ao deletar cliente');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <button
          onClick={() => handleOpenModal()}
          className="btn-primary"
        >
          + Novo Cliente
        </button>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">CPF</th>
              <th className="px-4 py-2 text-left">Telefone</th>
              <th className="px-4 py-2 text-left">Endereço</th>
              <th className="px-4 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="table-row">
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.cpf || 'N/A'}</td>
                <td className="px-4 py-2">{customer.phone || 'N/A'}</td>
                <td className="px-4 py-2">{customer.address || 'N/A'}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleOpenModal(customer)}
                    className="btn-secondary btn-small mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="btn-danger btn-small"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <p className="text-center text-gray-500 py-8">Nenhum cliente cadastrado</p>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        title={editingId ? 'Editar Cliente' : 'Novo Cliente'}
        onClose={handleCloseModal}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Nome *</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label">CPF</label>
            <input
              type="text"
              className="form-input"
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            />
          </div>

          <div>
            <label className="form-label">Data de Nascimento</label>
            <input
              type="date"
              className="form-input"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            />
          </div>

          <div>
            <label className="form-label">Telefone</label>
            <input
              type="tel"
              className="form-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="form-label">Endereço</label>
            <input
              type="text"
              className="form-input"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div>
            <label className="form-label">CEP</label>
            <input
              type="text"
              className="form-input"
              value={formData.cep}
              onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            {editingId ? 'Atualizar' : 'Criar'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CustomersPage;
