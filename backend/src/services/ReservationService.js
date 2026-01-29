const ReservationRepository = require('../repositories/ReservationRepository');
const PieceRepository = require('../repositories/PieceRepository');

class ReservationService {
  static async createReservation(reservationData) {
    // Validar datas
    if (new Date(reservationData.withdrawalDate) >= new Date(reservationData.returnDate)) {
      throw new Error('Data de devolução deve ser posterior à data de retirada');
    }

    // Validar peça
    const piece = await PieceRepository.findById(reservationData.pieceId);
    if (!piece) {
      throw new Error('Peça não encontrada');
    }

    // Validar conflito de reserva
    const conflict = await ReservationRepository.checkConflict(
      reservationData.pieceId,
      reservationData.withdrawalDate,
      reservationData.returnDate
    );

    if (conflict) {
      throw new Error('Peça já possui uma reserva nesse período');
    }

    // Criar reserva
    const reservation = await ReservationRepository.create(reservationData);

    // Atualizar status da peça
    if (piece.status === 'available') {
      await PieceRepository.update(reservationData.pieceId, { status: 'rented' });
    }

    return reservation;
  }

  static async getReservationById(id) {
    const reservation = await ReservationRepository.findById(id);
    
    if (!reservation) {
      throw new Error('Reserva não encontrada');
    }

    return reservation;
  }

  static async getAllReservations(filters = {}) {
    return ReservationRepository.findAll(filters);
  }

  static async updateReservation(id, data) {
    const reservation = await ReservationRepository.findById(id);
    
    if (!reservation) {
      throw new Error('Reserva não encontrada');
    }

    // Se mudar datas, validar conflito
    if (data.withdrawalDate || data.returnDate) {
      const withdrawalDate = data.withdrawalDate || reservation.withdrawalDate;
      const returnDate = data.returnDate || reservation.returnDate;

      if (new Date(withdrawalDate) >= new Date(returnDate)) {
        throw new Error('Data de devolução deve ser posterior à data de retirada');
      }

      const conflict = await ReservationRepository.checkConflict(
        reservation.pieceId,
        withdrawalDate,
        returnDate,
        id
      );

      if (conflict) {
        throw new Error('Peça já possui uma reserva nesse período');
      }
    }

    const [, updated] = await ReservationRepository.update(id, data);
    return updated[0];
  }

  static async cancelReservation(id) {
    const reservation = await ReservationRepository.findById(id);
    
    if (!reservation) {
      throw new Error('Reserva não encontrada');
    }

    if (reservation.status === 'cancelled') {
      throw new Error('Reserva já foi cancelada');
    }

    // Atualizar status da reserva
    await ReservationRepository.update(id, { status: 'cancelled' });

    // Verificar se há outras reservas ativas para essa peça
    const activeReservations = await ReservationRepository.findByPiece(reservation.pieceId);
    const hasActive = activeReservations.some(r => 
      r.status !== 'cancelled' && r.status !== 'completed' && r.id !== id
    );

    // Se não houver, voltar peça para disponível
    if (!hasActive) {
      await PieceRepository.update(reservation.pieceId, { status: 'available' });
    }
  }

  static async completeReservation(id) {
    const reservation = await ReservationRepository.findById(id);
    
    if (!reservation) {
      throw new Error('Reserva não encontrada');
    }

    await ReservationRepository.update(id, { status: 'completed' });
    
    // Voltar peça para disponível
    await PieceRepository.update(reservation.pieceId, { status: 'available' });
  }

  static async deleteReservation(id) {
    const reservation = await ReservationRepository.findById(id);
    
    if (!reservation) {
      throw new Error('Reserva não encontrada');
    }

    await ReservationRepository.delete(id);
  }
}

module.exports = ReservationService;
