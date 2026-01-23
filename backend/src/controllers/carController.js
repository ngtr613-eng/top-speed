import { Car } from '../models/Car.js';
import { Modification } from '../models/Modification.js';
import { getCarsByBrand, getCarByModel } from '../services/carApiService.js';

// بيانات افتراضية للسيارات - محسّنة وموسعة
const DEFAULT_CARS = [
  {
    brand: 'BMW',
    model: '335i',
    year: 2023,
    engine: {
      displacement: 2979,
      cylinders: 6,
      type: 'Turbocharged Inline-6',
    },
    horsepower: 382,
    torque: 369,
    fuelType: 'Petrol',
    acceleration: 4.8,
    topSpeed: 250,
    drivetrain: 'RWD',
    category: 'Sedan',
    price: 65000,
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop',
    description: 'High-performance luxury sedan with turbocharged engine',
    isVisible: true,
  },
  {
    brand: 'Mercedes-Benz',
    model: 'AMG C63',
    year: 2023,
    engine: {
      displacement: 3982,
      cylinders: 8,
      type: 'Turbocharged V8',
    },
    horsepower: 503,
    torque: 516,
    fuelType: 'Petrol',
    acceleration: 3.9,
    topSpeed: 290,
    drivetrain: 'RWD',
    category: 'Sedan',
    price: 75000,
    imageUrl: 'https://images.unsplash.com/photo-1553882900-d174edf69280?w=800&h=600&fit=crop',
    description: 'Powerful German performance car with legendary handling',
    isVisible: true,
  },
  {
    brand: 'Audi',
    model: 'RS6',
    year: 2023,
    engine: {
      displacement: 3996,
      cylinders: 10,
      type: 'Turbocharged V10',
    },
    horsepower: 591,
    torque: 590,
    fuelType: 'Petrol',
    acceleration: 3.6,
    topSpeed: 305,
    drivetrain: 'AWD',
    category: 'Sedan',
    price: 110000,
    imageUrl: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&h=600&fit=crop',
    description: 'Ultra-high performance station wagon',
    isVisible: true,
  },
  {
    brand: 'Porsche',
    model: '911 Carrera',
    year: 2023,
    engine: {
      displacement: 2981,
      cylinders: 6,
      type: 'Turbocharged Flat-6',
    },
    horsepower: 385,
    torque: 331,
    fuelType: 'Petrol',
    acceleration: 4.7,
    topSpeed: 308,
    drivetrain: 'RWD',
    category: 'Sports',
    price: 125000,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    description: 'Iconic sports car with legendary handling',
    isVisible: true,
  },
  {
    brand: 'Lamborghini',
    model: 'Huracán',
    year: 2023,
    engine: {
      displacement: 5204,
      cylinders: 10,
      type: 'Naturally Aspirated V10',
    },
    horsepower: 631,
    torque: 443,
    fuelType: 'Petrol',
    acceleration: 2.9,
    topSpeed: 325,
    drivetrain: 'AWD',
    category: 'Sports',
    price: 261000,
    imageUrl: 'https://images.unsplash.com/photo-1545587348-3e0a39a15d31?w=800&h=600&fit=crop',
    description: 'Exotic supercar with stunning performance',
    isVisible: true,
  },
  {
    brand: 'Ferrari',
    model: 'F8 Tributo',
    year: 2023,
    engine: {
      displacement: 3902,
      cylinders: 8,
      type: 'Turbocharged V8',
    },
    horsepower: 710,
    torque: 568,
    fuelType: 'Petrol',
    acceleration: 2.9,
    topSpeed: 340,
    drivetrain: 'RWD',
    category: 'Sports',
    price: 280000,
    imageUrl: 'https://images.unsplash.com/photo-1541282441313-a373d90fe5e7?w=800&h=600&fit=crop',
    description: 'Masterpiece of Italian engineering and design',
    isVisible: true,
  },
  {
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2023,
    engine: {
      displacement: 0,
      cylinders: 0,
      type: 'Electric Triple Motor',
    },
    horsepower: 1020,
    torque: 1350,
    fuelType: 'Electric',
    acceleration: 1.99,
    topSpeed: 322,
    drivetrain: 'AWD',
    category: 'Sedan',
    price: 110000,
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop',
    description: 'Insane performance electric sedan',
    isVisible: true,
  },
  {
    brand: 'McLaren',
    model: '720S',
    year: 2023,
    engine: {
      displacement: 3994,
      cylinders: 8,
      type: 'Twin-Turbocharged V8',
    },
    horsepower: 710,
    torque: 568,
    fuelType: 'Petrol',
    acceleration: 2.8,
    topSpeed: 341,
    drivetrain: 'RWD',
    category: 'Sports',
    price: 315000,
    imageUrl: 'https://images.unsplash.com/photo-1511159383423-3ec4e7f07ac6?w=800&h=600&fit=crop',
    description: 'Superlight British supercar with incredible agility',
    isVisible: true,
  },
  {
    brand: 'Bentley',
    model: 'Continental GT',
    year: 2023,
    engine: {
      displacement: 5950,
      cylinders: 12,
      type: 'Twin-Turbocharged W12',
    },
    horsepower: 626,
    torque: 664,
    fuelType: 'Petrol',
    acceleration: 3.7,
    topSpeed: 330,
    drivetrain: 'AWD',
    category: 'Coupe',
    price: 230000,
    imageUrl: 'https://images.unsplash.com/photo-1579824675243-d08b2ad4e8c8?w=800&h=600&fit=crop',
    description: 'Ultimate luxury grand tourer',
    isVisible: true,
  },
  {
    brand: 'Bugatti',
    model: 'Chiron',
    year: 2023,
    engine: {
      displacement: 7993,
      cylinders: 16,
      type: 'Quad-Turbocharged W16',
    },
    horsepower: 1500,
    torque: 1180,
    fuelType: 'Petrol',
    acceleration: 2.4,
    topSpeed: 490,
    drivetrain: 'AWD',
    category: 'Sports',
    price: 2900000,
    imageUrl: 'https://images.unsplash.com/photo-1608345921519-2d18b85bec2f?w=800&h=600&fit=crop',
    description: 'The hypercar definition - raw power and speed',
    isVisible: true,
  },
  {
    brand: 'Rolls-Royce',
    model: 'Ghost',
    year: 2023,
    engine: {
      displacement: 6592,
      cylinders: 12,
      type: 'Twin-Turbocharged V12',
    },
    horsepower: 563,
    torque: 575,
    fuelType: 'Petrol',
    acceleration: 4.8,
    topSpeed: 250,
    drivetrain: 'RWD',
    category: 'Sedan',
    price: 300000,
    imageUrl: 'https://images.unsplash.com/photo-1550528555-cbc086dc404e?w=800&h=600&fit=crop',
    description: 'Pinnacle of British luxury and refinement',
    isVisible: true,
  },
  {
    brand: 'Jaguar',
    model: 'F-Type',
    year: 2023,
    engine: {
      displacement: 4999,
      cylinders: 8,
      type: 'Supercharged V8',
    },
    horsepower: 567,
    torque: 516,
    fuelType: 'Petrol',
    acceleration: 3.7,
    topSpeed: 299,
    drivetrain: 'RWD',
    category: 'Sports',
    price: 99000,
    imageUrl: 'https://images.unsplash.com/photo-1615456143395-70a188dd6ded?w=800&h=600&fit=crop',
    description: 'Graceful yet brutally powerful British sports car',
    isVisible: true,
  },
  {
    brand: 'Dodge',
    model: 'Challenger SRT',
    year: 2023,
    engine: {
      displacement: 5700,
      cylinders: 8,
      type: 'Supercharged V8',
    },
    horsepower: 807,
    torque: 707,
    fuelType: 'Petrol',
    acceleration: 3.4,
    topSpeed: 290,
    drivetrain: 'RWD',
    category: 'Coupe',
    price: 85000,
    imageUrl: 'https://images.unsplash.com/photo-1574470611937-7cf1a4a7b7b8?w=800&h=600&fit=crop',
    description: 'American muscle car with aggressive styling',
    isVisible: true,
  },
  {
    brand: 'Corvette',
    model: 'Stingray',
    year: 2023,
    engine: {
      displacement: 5498,
      cylinders: 8,
      type: 'Naturally Aspirated V8',
    },
    horsepower: 495,
    torque: 465,
    fuelType: 'Petrol',
    acceleration: 3.0,
    topSpeed: 320,
    drivetrain: 'RWD',
    category: 'Sports',
    price: 70000,
    imageUrl: 'https://images.unsplash.com/photo-1618854827259-cb6f4f02d32a?w=800&h=600&fit=crop',
    description: 'American legend with mid-engine innovation',
    isVisible: true,
  },
];

export const getAllCars = async (req, res) => {
  try {
    const { brand, isVisible } = req.query;
    const query = {};

    if (brand) {
      query.brand = brand;
    }
    if (isVisible !== undefined) {
      query.isVisible = isVisible === 'true';
    } else {
      query.isVisible = true;
    }

    let cars = await Car.find(query).sort({ createdAt: -1 }).limit(100);
    
    // إذا كانت قاعدة البيانات فارغة، استخدم البيانات الافتراضية
    if (cars.length === 0) {
      cars = DEFAULT_CARS.map((car, idx) => ({
        _id: `default_${idx}`,
        ...car
      })).filter(car => {
        if (brand && car.brand !== brand) return false;
        if (isVisible !== undefined && car.isVisible !== (isVisible === 'true')) return false;
        return true;
      });
    }
    
    console.log(`✅ Returning ${cars.length} cars`);
    res.json(cars);
  } catch (error) {
    console.log(`⚠️ Error fetching cars from DB, using defaults: ${error.message}`);
    // إذا حدث خطأ في الاتصال بـ DB، أرجع البيانات الافتراضية
    const { brand, isVisible } = req.query;
    let cars = DEFAULT_CARS.map((car, idx) => ({
      _id: `default_${idx}`,
      ...car
    })).filter(car => {
      if (brand && car.brand !== brand) return false;
      if (isVisible !== undefined && car.isVisible !== (isVisible === 'true')) return false;
      return true;
    });
    console.log(`✅ Returning ${cars.length} default cars`);
    res.json(cars);
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    const modifications = await Modification.find({ carId: id });
    res.json({ car, modifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCar = async (req, res) => {
  try {
    const carData = req.body;
    const car = new Car(carData);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const car = await Car.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    await Modification.deleteMany({ carId: id });
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const importFromAPI = async (req, res) => {
  try {
    const { brand } = req.body;

    if (!brand) {
      return res.status(400).json({ error: 'Brand required' });
    }

    const apiCars = await getCarsByBrand(brand);
    const savedCars = [];

    for (const carData of apiCars) {
      const existingCar = await Car.findOne({
        brand: carData.brand,
        model: carData.model,
        year: carData.year,
      });

      if (!existingCar) {
        const car = new Car(carData);
        const saved = await car.save();
        savedCars.push(saved);
      }
    }

    res.status(201).json({
      message: `Imported ${savedCars.length} new cars`,
      cars: savedCars,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
