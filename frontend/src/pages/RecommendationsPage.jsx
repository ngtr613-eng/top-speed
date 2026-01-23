import React, { useEffect, useState } from 'react';
import { recommendationService, carService } from '../services/api';
import { AnimatedCard, PageTransition } from '../components/Animations';
import { Header, Footer } from '../components/Layout';
import { Navigation } from '../components/Navigation';
import { Zap, TrendingUp, Gauge } from 'lucide-react';

export const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState('medium');
  const [engineType, setEngineType] = useState('');
  const [drivingStyle, setDrivingStyle] = useState('balanced');
  const [modificationInterest, setModificationInterest] = useState('medium');

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const response = await recommendationService.getRecommendations({
        performanceLevel,
        engineType,
        drivingStyle,
        modificationInterest,
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <Navigation />
      <Header
        title="AI Car Recommendations"
        subtitle="Find your perfect car match"
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-8">Find Your Match</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-white font-semibold mb-3">
                Performance Level
              </label>
              <select
                value={performanceLevel}
                onChange={(e) => setPerformanceLevel(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
              >
                <option value="low">Low (0-150 HP)</option>
                <option value="medium">Medium (150-300 HP)</option>
                <option value="high">High (300-500 HP)</option>
                <option value="extreme">Extreme (500+ HP)</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">
                Engine Type
              </label>
              <select
                value={engineType}
                onChange={(e) => setEngineType(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
              >
                <option value="">Any</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">
                Driving Style
              </label>
              <select
                value={drivingStyle}
                onChange={(e) => setDrivingStyle(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
              >
                <option value="balanced">Balanced</option>
                <option value="performance">Performance</option>
                <option value="luxury">Luxury</option>
                <option value="efficiency">Efficiency</option>
                <option value="adventure">Adventure</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">
                Modification Interest
              </label>
              <select
                value={modificationInterest}
                onChange={(e) => setModificationInterest(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGetRecommendations}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Finding matches...' : 'Get Recommendations'}
          </button>
        </div>

        {recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, idx) => (
              <AnimatedCard key={idx} delay={idx * 0.1}>
                <div className="mb-4 pb-4 border-b border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {rec.carName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${rec.matchScore}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-bold text-sm">
                      {Math.round(rec.matchScore)}%
                    </span>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <p className="text-gray-400 text-sm font-semibold">Top Reasons:</p>
                  {rec.topReasons.map((reason, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{reason}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Horsepower</span>
                    <span className="text-white font-semibold">{rec.specs.horsepower} HP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Top Speed</span>
                    <span className="text-white font-semibold">{rec.specs.topSpeed} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">0-100 km/h</span>
                    <span className="text-white font-semibold">{rec.specs.acceleration.toFixed(1)}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Fuel Type</span>
                    <span className="text-white font-semibold">{rec.specs.fuelType}</span>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}

        {!loading && recommendations.length === 0 && performanceLevel && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              Click "Get Recommendations" to find your perfect car
            </p>
          </div>
        )}
      </div>

      <Footer />
    </PageTransition>
  );
};
