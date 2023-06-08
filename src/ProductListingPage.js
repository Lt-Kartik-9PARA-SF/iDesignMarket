import React, { useState } from 'react';

const Seat = ({ seatNumber, isSelected }) => (
  <div className={`seat ${isSelected ? 'selected' : ''}`}>
    {seatNumber}
  </div>
);

const Page = () => {
  const totalSeats = 80;
  const seatsPerRow = 7;
  const totalRows = Math.ceil(totalSeats / seatsPerRow);

  const [seats, setSeats] = useState(Array(totalSeats).fill(false));
  const [numSeats, setNumSeats] = useState(0);

  const handleSeatSelection = () => {
    if(numSeats > 7){
      alert('cant book more than 7 seats at once');
      setNumSeats(0);
      return;
    }
    const selectedSeats = [];
    let remainingSeats = numSeats;

    for (let row = 0; row < totalRows; row++) {
      for (let seat = 0; seat < seatsPerRow; seat++) {
        const seatIndex = row * seatsPerRow + seat;

        if (!seats[seatIndex]) {
          selectedSeats.push(seatIndex);
          remainingSeats--;

          if (remainingSeats === 0) {
            const newSeats = [...seats];
            selectedSeats.forEach((seat) => {
              newSeats[seat] = true;
            });

            setSeats(newSeats);
            setNumSeats(0);
            return;
          }
        }
      }
    }

    alert('Not enough seats available.');
  };

  const renderSeats = () => {
    const seatRows = [];

    for (let row = 0; row < totalRows; row++) {
      const rowSeats = [];

      for (let seat = 0; seat < seatsPerRow; seat++) {
        const seatIndex = row * seatsPerRow + seat;
        rowSeats.push(
          <Seat
            key={seatIndex}
            seatNumber={seatIndex + 1}
            isSelected={seats[seatIndex]}
          />
        );
      }

      seatRows.push(
        <div className="row" key={row}>
          {rowSeats}
        </div>
      );
    }

    return seatRows;
  };

  const availableSeats = seats.filter((seat) => !seat).length;
  const bookedSeats = seats.filter((seat) => seat).length;

  return (
    <div className="app">
      <h1>Ticket Booking App</h1>
      <div>
        <input
          type="number"
          min={1}
          max={7}
          value={numSeats}
          onChange={(e) => setNumSeats(parseInt(e.target.value))}
        />
        <button onClick={handleSeatSelection}>Book Seats</button>
      </div>
      <div className="seat-layout">
        {renderSeats()}
      </div>
      <div className="seat-info">
        <p>Available Seats: {availableSeats}</p>
        <p>Booked Seats: {bookedSeats}</p>
      </div>
    </div>
  );
};

export default Page;
