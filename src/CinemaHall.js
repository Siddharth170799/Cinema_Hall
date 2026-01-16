import { useState } from "react";
import "./cinemaHall.css";

const ROW = 10,
  COL = 10;

export default function CinemaHall() {
  const [selectedSeats, setselectedSeats] = useState({});
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  const addSeats = (series, number) => {
    if (!selectedSeats[series]?.includes(series + number)) {
      setselectedSeats({
        ...selectedSeats,
        [series.toString()]: Array.isArray(selectedSeats[series])
          ? [...selectedSeats?.[series], series + number.toString()]
          : [series + number.toString()],
      });
    } else {
      setselectedSeats({
        ...selectedSeats,
        [series.toString()]: selectedSeats?.[series]?.filter((item) => {
          if (item !== series + number) {
            return true;
          }
          return false;
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
    keys.forEach((item) => {
      selectedSeats[item].forEach((seat) => {
        selected.push(seat);
      });
    });

    setBookedSeats(selected);
    setselectedSeats({});
  };

  const clearSeats = () => {
    setselectedSeats({});
  };

  const resetSeats = () => {
    setIsSelected(false);
    setBookedSeats([]);
    setselectedSeats({});
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
                          obj[rowIdx] + colIdx?.toString()
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