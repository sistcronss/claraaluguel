import React, { useEffect, useState } from 'react';
import { pieceService, sectorService } from '../services';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import Modal from '../components/Modal';

const PiecesPage = () => {
  const [pieces, setPieces] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    sectorId: '',
    category: 'clothing',
    size: '',
    color: '',
    rentalPrice: '',
    salePrice: '',
  });

  useEffect(() => {
    fetchData();
  }, [filterStatus]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [piecesRes, sectorsRes] = await Promise.all([
        pieceService.getAll({ status: filterStatus || undefined }),
        sectorService.getAll(),
      ]);
      setPieces(piecesRes.data.data);
      setSectors(sectorsRes.data.data);
    } catch (err) {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (piece = null) => {
    if (piece) {
      setEditingId(piece.id);
      setFormData(piece);
    } else {
      setEditingId(null);
      setFormData({
        code: '',
        description: '',
        sectorId: '',
        category: 'clothing',
        size: '',
        color: '',
        rentalPrice: '',
        salePrice: '',
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
        await pieceService.update(editingId, formData);
      } else {
        await pieceService.create(formData);
      }
      fetchData();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar peça');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta peça?')) {
      try {
        await pieceService.delete(id);
        fetchData();
      } catch (err) {
        setError('Erro ao deletar peça');
      }
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      available: 'badge-success',
      rented: 'badge-info',
      maintenance: 'badge-warning',
      for_sale: 'badge-danger',
    };
    return badges[status] || 'badge-info';
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Peças</h1>
        <button
          onClick={() => handleOpenModal()}
          className="btn-primary"
        >
          + Nova Peça
        </button>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <div className="mb-4">
        <select
          className="form-input max-w-xs"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Todos os Status</option>
          <option value="available">Disponível</option>
          <option value="rented">Alugada</option>
          <option value="maintenance">Manutenção</option>
          <option value="for_sale">À Venda</option>
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="table-header">
            <tr>
              <th className="px-4 py-2 text-left">Código</th>
              <th className="px-4 py-2 text-left">Descrição</th>
              <th className="px-4 py-2 text-left">Setor</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Preço</th>
              <th className="px-4 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pieces.map((piece) => (
              <tr key={piece.id} className="table-row">
                <td className="px-4 py-2 font-mono">{piece.code}</td>
                <td className="px-4 py-2">{piece.description}</td>
                <td className="px-4 py-2">{piece.sector?.name}</td>
                <td className="px-4 py-2">
                  <span className={getStatusBadge(piece.status)}>
                    {piece.status === 'for_sale' ? 'À Venda' : piece.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">R$ {piece.rentalPrice}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleOpenModal(piece)}
                    className="btn-secondary btn-small mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(piece.id)}
                    className="btn-danger btn-small"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pieces.length === 0 && (
          <p className="text-center text-gray-500 py-8">Nenhuma peça cadastrada</p>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        title={editingId ? 'Editar Peça' : 'Nova Peça'}
        onClose={handleCloseModal}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Código *</label>
            <input
              type="text"
              className="form-input"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label">Descrição *</label>
            <input
              type="text"
              className="form-input"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="form-label">Setor *</label>
            <select
              className="form-input"
              value={formData.sectorId}
              onChange={(e) => setFormData({ ...formData, sectorId: e.target.value })}
              required
            >
              <option value="">Selecione um setor</option>
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Categoria *</label>
            <select
              className="form-input"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="clothing">Roupa</option>
              <option value="bag">Bolsa</option>
              <option value="accessory">Acessório</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Tamanho</label>
              <input
                type="text"
                className="form-input"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Cor</label>
              <input
                type="text"
                className="form-input"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Preço Aluguel *</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.rentalPrice}
                onChange={(e) => setFormData({ ...formData, rentalPrice: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="form-label">Preço Venda</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            {editingId ? 'Atualizar' : 'Criar'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PiecesPage;
