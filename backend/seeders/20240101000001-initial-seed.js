'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    // Criar setores
    const sectors = await queryInterface.bulkInsert('sectors', [
      {
        id: uuidv4(),
        name: 'Vestidos',
        description: 'Setor de aluguel e venda de vestidos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Ternos',
        description: 'Setor de aluguel e venda de ternos',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: ['id'] });

    // Criar usuários
    const salt = await bcrypt.genSalt(10);
    const adminUser = await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        login: 'admin',
        password: await bcrypt.hash('admin123', salt),
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: ['id'] });

    // Criar funcionários
    const employeeUser = {
      id: uuidv4(),
      login: 'funcionario1',
      password: await bcrypt.hash('func123', salt),
      role: 'employee',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await queryInterface.bulkInsert('users', [employeeUser], { returning: ['id'] });

    const adminId = 'af4a5b1c-1234-5678-9abc-def012345678';
    const empId = 'bf4a5b1c-1234-5678-9abc-def012345679';

    await queryInterface.bulkInsert('employees', [
      {
        id: uuidv4(),
        userId: adminId,
        name: 'Administrador Clara',
        position: 'Gerente',
        phone: '11999999999',
        hireDate: '2024-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        userId: empId,
        name: 'João Silva',
        position: 'Vendedor',
        phone: '11988888888',
        hireDate: '2024-01-15',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Criar clientes
    const customers = await queryInterface.bulkInsert('customers', [
      {
        id: uuidv4(),
        name: 'Maria Santos',
        cpf: '12345678901',
        birthDate: '1990-05-15',
        phone: '11991234567',
        address: 'Rua das Flores, 123',
        cep: '01234-567',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'José Costa',
        cpf: '98765432109',
        birthDate: '1985-10-20',
        phone: '11987654321',
        address: 'Avenida Principal, 456',
        cep: '02345-678',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // Criar setores para recuperar IDs
    const sectorData = await queryInterface.sequelize.query('SELECT id, name FROM sectors LIMIT 2');
    const sectorIds = sectorData[0];
    const vestidoSectorId = sectorIds.find(s => s.name === 'Vestidos')?.id;
    const ternoSectorId = sectorIds.find(s => s.name === 'Ternos')?.id;

    // Criar peças
    await queryInterface.bulkInsert('pieces', [
      {
        id: uuidv4(),
        code: 'VES001',
        description: 'Vestido de noiva branco',
        sectorId: vestidoSectorId,
        category: 'clothing',
        size: 'P',
        color: 'Branco',
        rentalPrice: 150.00,
        status: 'available',
        salePrice: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        code: 'VES002',
        description: 'Vestido de festinha rosa',
        sectorId: vestidoSectorId,
        category: 'clothing',
        size: 'M',
        color: 'Rosa',
        rentalPrice: 80.00,
        status: 'available',
        salePrice: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        code: 'TER001',
        description: 'Terno preto completo',
        sectorId: ternoSectorId,
        category: 'clothing',
        size: 'M',
        color: 'Preto',
        rentalPrice: 120.00,
        status: 'available',
        salePrice: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        code: 'BAG001',
        description: 'Bolsa clutch dourada',
        sectorId: vestidoSectorId,
        category: 'bag',
        size: 'U',
        color: 'Dourado',
        rentalPrice: 30.00,
        status: 'available',
        salePrice: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    console.log('✓ Seed de dados criado com sucesso');
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('pieces', null, {});
    await queryInterface.bulkDelete('employees', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('customers', null, {});
    await queryInterface.bulkDelete('sectors', null, {});
  }
};
