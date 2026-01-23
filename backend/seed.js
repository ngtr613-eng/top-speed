import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Car } from './src/models/Car.js';

dotenv.config();

const seedCars = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/topspeed');
    
    // Clear existing cars
    await Car.deleteMany({});
    
    const carsData = [
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
        imageUrl: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800',
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
        imageUrl: 'https://images.unsplash.com/photo-1553882900-d174edf69280?w=800',
        description: 'Powerful German performance car',
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
        imageUrl: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800',
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
        imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
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
        imageUrl: 'https://images.unsplash.com/photo-1545587348-3e0a39a15d31?w=800',
        description: 'Exotic supercar with stunning performance',
        isVisible: true,
      },
    ];
    
    const result = await Car.insertMany(carsData);
    console.log(`✅ ${result.length} cars added to database`);
    
    await mongoose.disconnect();
    console.log('✅ Database seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedCars();
