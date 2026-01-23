import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { carService, modificationService, configuratorService } from '../services/api';
import { AnimatedCard, PageTransition } from '../components/Animations';
import { Header, Footer } from '../components/Layout';
import { Navigation } from '../components/Navigation';
import { Zap, Gauge, DollarSign, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export const ConfiguratorPage = () => {
  const [searchParams] = useSearchParams();
  const carId = searchParams.get('carId');

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMods, setSelectedMods] = useState({
    wheels: false,
    bodyKit: false,
    exhaust: false,
    performance: false,
  });
  const [impact, setImpact] = useState(null);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      if (!carId) {
        setLoading(false);
        return;
      }
      try {
        const response = await carService.getCarById(carId);
        setCar(response.data.car);
      } catch (error) {
        console.error('Failed to load car:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [carId]);

  const handleCalculate = async () => {
    if (!car) return;

    setCalculating(true);
    try {
      const mods = Object.keys(selectedMods).filter((key) => selectedMods[key]);
      const response = await configuratorService.calculateConfiguration(carId, mods);
      setImpact(response.data);
    } catch (error) {
      console.error('Failed to calculate:', error);
    } finally {
      setCalculating(false);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading configurator...</p>
          </div>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  if (!car) {
    return (
      <PageTransition>
        <Navigation />
        <Header title="Car Configurator" subtitle="Customize your vehicle" />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-400">Please select a car first</p>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navigation />
      <Header
        title="Car Configurator"
        subtitle={`${car.brand} ${car.model} - Customize & Calculate Performance`}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-8">
                Base Specifications
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="text-gray-400 text-sm">Horsepower</p>
                    <p className="text-white font-bold text-xl">{car.horsepower} HP</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-gray-400 text-sm">Top Speed</p>
                    <p className="text-white font-bold text-xl">{car.topSpeed} km/h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wrench className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="text-gray-400 text-sm">0-100 km/h</p>
                    <p className="text-white font-bold text-xl">
                      {car.acceleration.toFixed(1)}s
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="text-gray-400 text-sm">Torque</p>
                    <p className="text-white font-bold text-xl">{car.torque} Nm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-8">
                Modification Options
              </h2>

              <div className="space-y-4">
                {[
                  {
                    key: 'wheels',
                    name: 'Performance Wheels',
                    description: 'Upgrade to lightweight performance wheels',
                    boost: '10 HP',
                  },
                  {
                    key: 'bodyKit',
                    name: 'Body Kit',
                    description: 'Aerodynamic body kit for enhanced styling',
                    boost: '15 HP',
                  },
                  {
                    key: 'exhaust',
                    name: 'Performance Exhaust',
                    description: 'High-flow exhaust system for power gains',
                    boost: '20 HP, 25 Nm',
                  },
                  {
                    key: 'performance',
                    name: 'Engine Tuning',
                    description: 'Professional ECU tuning and optimization',
                    boost: '40 HP, 50 Nm',
                  },
                ].map((mod) => (
                  <div key={mod.key} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id={mod.key}
                      checked={selectedMods[mod.key]}
                      onChange={(e) =>
                        setSelectedMods({
                          ...selectedMods,
                          [mod.key]: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded border-gray-700 bg-gray-800 cursor-pointer accent-red-600"
                    />
                    <div className="flex-1">
                      <label htmlFor={mod.key} className="cursor-pointer block">
                        <p className="text-white font-semibold">{mod.name}</p>
                        <p className="text-gray-400 text-sm">{mod.description}</p>
                      </label>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-semibold">{mod.boost}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleCalculate}
                disabled={calculating}
                className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {calculating ? 'Calculating...' : 'Calculate Impact'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            {impact && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-red-900/20 to-blue-900/20 border border-gray-800 rounded-lg p-8 sticky top-20"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Performance Impact
                </h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Horsepower</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-white font-bold text-2xl">
                        {impact.modifiedHorsepower} HP
                      </p>
                      <p className="text-red-600 font-bold text-lg">
                        +{impact.horsepowergain} HP
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2">Top Speed</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-white font-bold text-2xl">
                        {impact.modifiedTopSpeed} km/h
                      </p>
                      <p className="text-blue-600 font-bold text-lg">
                        +{impact.topSpeedIncrease} km/h
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2">Acceleration</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-white font-bold text-2xl">
                        {impact.modifiedAcceleration.toFixed(2)}s
                      </p>
                      <p className="text-green-600 font-bold text-lg">
                        -{impact.accelerationImprovement.toFixed(2)}s
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2">Torque</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-white font-bold text-2xl">
                        {impact.modifiedTorque} Nm
                      </p>
                      <p className="text-orange-600 font-bold text-lg">
                        +{impact.torqueGain} Nm
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <p className="text-gray-400 text-sm mb-2">Total Investment</p>
                    <p className="text-white font-bold text-3xl">
                      ${impact.totalPrice.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-300">
                    <p className="font-semibold text-white mb-2">Selected Modifications:</p>
                    <ul className="space-y-1">
                      {impact.modifications.map((mod) => (
                        <li key={mod} className="capitalize">
                          {mod.replace(/([A-Z])/g, ' $1').trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {!impact && (
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
                <Wrench className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Select modifications and click "Calculate Impact" to see results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
};
