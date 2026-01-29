import React, { useEffect, useState } from 'react';
import { reportService } from '../services';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const DashboardPage = () => {
  const [data, setData] = useState({
    stockReport: null,
    monthlyRevenue: null,
    pendingPayments: [],
    mostRented: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      const [stock, revenue, pending, rented] = await Promise.all([
        reportService.getStockReport(),
        reportService.getMonthlyRevenue(month, year),
        reportService.getPendingPayments(),
        reportService.getMostRentedPieces(5),
      ]);

      setData({
        stockReport: stock.data.data,
        monthlyRevenue: revenue.data.data,
        pendingPayments: pending.data.data,
        mostRented: rented.data.data,
      });
    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <p className="text-gray-600 text-sm">Peças Disponíveis</p>
          <p className="text-3xl font-bold text-primary">{data.stockReport?.available || 0}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Peças Alugadas</p>
          <p className="text-3xl font-bold text-secondary">{data.stockReport?.rented || 0}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Em Manutenção</p>
          <p className="text-3xl font-bold text-warning">{data.stockReport?.maintenance || 0}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">À Venda</p>
          <p className="text-3xl font-bold text-danger">{data.stockReport?.forSale || 0}</p>
        </div>
      </div>

      {/* Receita Mensal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Receita do Mês</h2>
          <div className="space-y-2">
            <p>
              <span className="text-gray-600">Aluguéis:</span>
              <span className="font-bold ml-2">R$ {data.monthlyRevenue?.rentalRevenue?.toFixed(2) || '0.00'}</span>
            </p>
            <p>
              <span className="text-gray-600">Vendas:</span>
              <span className="font-bold ml-2">R$ {data.monthlyRevenue?.saleRevenue?.toFixed(2) || '0.00'}</span>
            </p>
            <hr className="my-2" />
            <p>
              <span className="text-gray-600 font-bold">Total:</span>
              <span className="font-bold ml-2 text-primary">
                R$ {data.monthlyRevenue?.totalRevenue?.toFixed(2) || '0.00'}
              </span>
            </p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Pagamentos em Aberto</h2>
          <p className="text-3xl font-bold text-danger">{data.pendingPayments?.length || 0}</p>
          <p className="text-gray-600 text-sm mt-2">Aguardando pagamento</p>
        </div>
      </div>

      {/* Peças Mais Alugadas */}
      <div className="card">
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
              {data.mostRented?.map((item) => (
                <tr key={item.pieceId} className="table-row">
                  <td className="px-4 py-2">{item.piece?.code || 'N/A'}</td>
                  <td className="px-4 py-2">{item.piece?.description || 'N/A'}</td>
                  <td className="px-4 py-2 text-right font-bold">{item.count}</td>
                </tr>
              ))}
              {data.mostRented?.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                    Nenhum aluguel registrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
