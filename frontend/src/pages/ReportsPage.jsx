import React, { useEffect, useState } from 'react';
import { reportService } from '../services';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const ReportsPage = () => {
  const [reports, setReports] = useState({
    revenue: null,
    pendingPayments: [],
    mostRented: [],
    frequentCustomers: [],
    stock: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchReports();
  }, [selectedMonth, selectedYear]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [revenue, pending, rented, frequent, stock] = await Promise.all([
        reportService.getMonthlyRevenue(selectedMonth, selectedYear),
        reportService.getPendingPayments(),
        reportService.getMostRentedPieces(10),
        reportService.getMostFrequentCustomers(10),
        reportService.getStockReport(),
      ]);

      setReports({
        revenue: revenue.data.data,
        pendingPayments: pending.data.data,
        mostRented: rented.data.data,
        frequentCustomers: frequent.data.data,
        stock: stock.data.data,
      });
    } catch (err) {
      setError('Erro ao carregar relatórios');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Relatórios</h1>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {/* Filtros */}
      <div className="card mb-6 flex gap-4 items-center">
        <div>
          <label className="form-label">Mês</label>
          <select
            className="form-input max-w-xs"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2024, i).toLocaleDateString('pt-BR', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Ano</label>
          <input
            type="number"
            className="form-input max-w-xs"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Receita */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <p className="text-gray-600 text-sm">Receita de Aluguéis</p>
          <p className="text-2xl font-bold text-primary">
            R$ {reports.revenue?.rentalRevenue?.toFixed(2) || '0.00'}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Receita de Vendas</p>
          <p className="text-2xl font-bold text-secondary">
            R$ {reports.revenue?.saleRevenue?.toFixed(2) || '0.00'}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Receita Total</p>
          <p className="text-2xl font-bold text-success">
            R$ {reports.revenue?.totalRevenue?.toFixed(2) || '0.00'}
          </p>
        </div>
      </div>

      {/* Estoque */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Status do Estoque</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Disponíveis</p>
            <p className="text-2xl font-bold">{reports.stock?.available || 0}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Alugadas</p>
            <p className="text-2xl font-bold">{reports.stock?.rented || 0}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Manutenção</p>
            <p className="text-2xl font-bold">{reports.stock?.maintenance || 0}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">À Venda</p>
            <p className="text-2xl font-bold">{reports.stock?.forSale || 0}</p>
          </div>
        </div>
      </div>

      {/* Peças Mais Alugadas */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Peças Mais Alugadas</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="px-4 py-2 text-left">Código</th>
                <th className="px-4 py-2 text-left">Descrição</th>
                <th className="px-4 py-2 text-right">Vezes Alugada</th>
              </tr>
            </thead>
            <tbody>
              {reports.mostRented?.map((item, idx) => (
                <tr key={idx} className="table-row">
                  <td className="px-4 py-2 font-mono">{item.piece?.code || 'N/A'}</td>
                  <td className="px-4 py-2">{item.piece?.description || 'N/A'}</td>
                  <td className="px-4 py-2 text-right font-bold">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {reports.mostRented?.length === 0 && (
            <p className="text-center text-gray-500 py-8">Nenhum aluguel registrado</p>
          )}
        </div>
      </div>

      {/* Clientes Frequentes */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Clientes Mais Frequentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="px-4 py-2 text-left">Nome</th>
                <th className="px-4 py-2 text-right">Reservas</th>
                <th className="px-4 py-2 text-right">Compras</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {reports.frequentCustomers?.map((customer, idx) => (
                <tr key={idx} className="table-row">
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2 text-right">{customer.totalReservations}</td>
                  <td className="px-4 py-2 text-right">{customer.totalPurchases}</td>
                  <td className="px-4 py-2 text-right font-bold">{customer.totalTransactions}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {reports.frequentCustomers?.length === 0 && (
            <p className="text-center text-gray-500 py-8">Nenhum cliente encontrado</p>
          )}
        </div>
      </div>

      {/* Pagamentos em Aberto */}
      <div className="card mt-8">
        <h2 className="text-xl font-bold mb-4">Pagamentos em Aberto: {reports.pendingPayments?.length}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reports.pendingPayments?.slice(0, 3).map((payment, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Valor Restante</p>
              <p className="text-xl font-bold text-danger">R$ {payment.remainingAmount?.toFixed(2) || '0.00'}</p>
              <p className="text-xs text-gray-500 mt-2">Status: {payment.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
