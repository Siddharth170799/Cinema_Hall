import { useState } from "react";
import "./cinemaHall.css";

const ROW = 10,
  COL = 10;

export default function CinemaHall() {
  const [selectedSeats, setSelectedSeats] = useState({});
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  const addSeats = (series, number) => {
    if (!selectedSeats[series]?.includes(series + number)) {
      setSelectedSeats({
        ...selectedSeats,
        [series.toString()]: Array.isArray(selectedSeats[series])
          ? [
              ...selectedSeats?.[series],
              `${series} + ${number.toString()}`,
            ]
          : [series + number.toString()],
      });
    } else {
      setSelectedSeats({
        ...selectedSeats,
        [series.toString()]: selectedSeats?.[series]?.filter((item) => {
          if (item !== series + number) {
            return true;
          }
        }),
      });
    }
  };

  const bookSeats = () => {
    if (Object.keys(selectedSeats)?.length === 0) {
      alert("select atleast one seat");
      return;
    }

    setIsSelected(true);

    const keys = Object.keys(selectedSeats);
    const selected = [];

    keys.map((item) => {
      return selectedSeats[item].map((item) => {
        selected.push(item);
      });
    });

    setBookedSeats(selected);
    setSelectedSeats({});
  };

  const clearSeats = () => {
    setSelectedSeats({});
  };

  const resetSeats = () => {
    setIsSelected(false);
    setBookedSeats([]);
    setSelectedSeats({});
  };

  const obj = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "J",
  };

  return (
    <div className="main-container">
      <h1>Cinema Hall</h1>

      <div className="button-section">
        <button data-testid="book-button" onClick={bookSeats}>
          Book Seats
        </button>

        <button data-testid="clear-button" onClick={clearSeats}>
          Clear
        </button>

        <button data-testid="reset-button" onClick={resetSeats}>
          Reset
        </button>
      </div>

      <div className="cinema-hall" data-testid="cinema-hall">
        {Array.from({ length: ROW }, (_, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: COL }, (_, colIdx) => {
              return (
                <div
                  aria-disabled={true}
                  onClick={() => addSeats(obj[rowIdx], colIdx)}
                  className={[
                    "col",
                    bookedSeats.includes(obj[rowIdx] + colIdx) && isSelected
                      ? "disabled-seat"
                      : selectedSeats[obj[rowIdx]]?.includes(
                          obj[rowIdx] + colIdx.toString()
                        )
                      ? "selected-seat"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={colIdx}
                >
                  {obj[rowIdx] + colIdx}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}