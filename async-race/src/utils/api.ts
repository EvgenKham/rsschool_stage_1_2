export type Car = {
  name: string;
  color: string;
  id?: number;
};

export type Winner = {
  wins: number;
  time: string;
  id: number;
};

export type WinnerTableDate = {
  id: number;
  color: string;
  name: string;
  wins: number;
  time: string;
};

// type Option = {
//   method: string;
//   headers: Object;
//   body: string;
// }

export async function getCar(carId: number): Promise<Car> {
  const url: string = `http://localhost:3000/garage/${carId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`No got car by id. HTTP code: ${response.status}`);
    }

    const car: Car = await response.json();
    return car;
  } catch (error) {
    throw error;
  }
}

export async function getAllCars(): Promise<Car[]> {
  const url: string = "http://localhost:3000/garage";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`No got all cars. HTTP code: ${response.status}`);
    }

    const cars: Car[] = await response.json();
    return cars;
  } catch (error) {
    throw error;
  }
}

export async function createCar(newCar: Car): Promise<void> {
  const url: string = "http://localhost:3000/garage";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCar),
  };

  try {
    const response = await fetch(url, options);
    if (response.status !== 201) {
      throw new Error("No created new car");
    }
    console.log("Car was created successfully");
  } catch (error) {
    throw error;
  }
}

export async function deleteCar(id: number): Promise<void> {
  const url: string = `http://localhost:3000/garage/${id}`;

  try {
    const response = await fetch(url, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`Car with id ${id} NOT FOUND`);
    }
    console.log(`Car with id ${id} was deleted successfully`);
  } catch (error) {
    throw error;
  }
}

export async function updateCar(updateCar: Car): Promise<Car> {
  const url: string = `http://localhost:3000/garage/${updateCar.id}`;
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateCar),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Car ${updateCar.name} NOT FOUND`);
    }
    console.log(`Car ${updateCar.name} was updated successfully`);
    const car: Car = await response.json();
    return car;
  } catch (error) {
    throw error;
  }
}

export async function getAllWinners(): Promise<Winner[]> {
  const url: string = "http://localhost:3000/winners";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`No got all winners. HTTP code: ${response.status}`);
    }

    const winners: Winner[] = await response.json();
    return winners;
  } catch (error) {
    throw error;
  }
}

export async function getDateForWins(): Promise<WinnerTableDate[]> {
  try {
    const winners = await getAllWinners();
    const cars = await getAllCars();

    const carsMap = new Map<number, Car>();
    for (const car of cars) {
      if (car.id) {
        carsMap.set(car.id, car);
      }
    }

    // Формируем массив строк таблицы
    const tableRows: WinnerTableDate[] = winners.map((winner) => {
      const car = carsMap.get(winner.id); // Получаем автомобиль по ID победителя

      return {
        id: winner.id,
        color: car ? car.color : "Unknown",
        name: car ? car.name : "Unknown",
        wins: winner.wins,
        time: winner.time,
      };
    });

    return tableRows;
  } catch (error) {
    console.log("Error getitng date for winner table:", error);
    throw error;
  }
}
