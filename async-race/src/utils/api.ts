export type Car = {
  name: string;
  color: string;
  id?: number;
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
