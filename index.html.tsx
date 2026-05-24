import React, { useState, useEffect } from 'react';
import { Scale, TrendingUp, Activity, Heart, RefreshCw, Copy, Check } from 'lucide-react';

// Main BMI Calculator Component
export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [healthTip, setHealthTip] = useState('');
  const [copied, setCopied] = useState(false);

  // Calculate BMI in real-time
  useEffect(() => {
    if (weight && height) {
      calculateBMI();
    }
  }, [weight, height, unit]);

  const calculateBMI = () => {
    let bmiValue;
    
    if (unit === 'metric') {
      // BMI = weight (kg) / (height (m))^2
      const heightInMeters = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    } else {
      // BMI = (weight (lbs) / (height (in))^2) * 703
      bmiValue = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) * 703;
    }

    if (isNaN(bmiValue) || !isFinite(bmiValue)) {
      setBmi(null);
      return;
    }

    setBmi(bmiValue.toFixed(1));
    
    // Determine category and health tip
    if (bmiValue < 18.5) {
      setCategory('Underweight');
      setHealthTip('Consider consulting a nutritionist to reach a healthy weight through balanced diet.');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory('Normal Weight');
      setHealthTip('Great! Maintain your healthy weight with regular exercise and balanced nutrition.');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory('Overweight');
      setHealthTip('Consider increasing physical activity and focusing on a balanced, calorie-controlled diet.');
    } else {
      setCategory('Obese');
      setHealthTip('We recommend consulting a healthcare professional for personalized guidance.');
    }
  };

  const handleClear = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
    setHealthTip('');
    setCopied(false);
  };

  const handleCopy = () => {
    const result = `My BMI: ${bmi} (${category})`;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = () => {
    if (category === 'Underweight') return 'text-blue-600';
    if (category === 'Normal Weight') return 'text-green-600';
    if (category === 'Overweight') return 'text-orange-600';
    if (category === 'Obese') return 'text-red-600';
    return 'text-gray-600';
  };

  const getCategoryBg = () => {
    if (category === 'Underweight') return 'bg-blue-100';
    if (category === 'Normal Weight') return 'bg-green-100';
    if (category === 'Overweight') return 'bg-orange-100';
    if (category === 'Obese') return 'bg-red-100';
    return 'bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* SEO-optimized Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scale className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BMI Calculator
              </h1>
            </div>
            <div className="hidden sm:flex items-center space-x-6">
              <a href="#calculator" className="text-gray-600 hover:text-blue-600 transition">Calculator</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition">About BMI</a>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition">
                Get Premium
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Calculate Your Body Mass Index
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Use our free, interactive BMI calculator to check your Body Mass Index and get personalized health tips. Mobile-friendly, fast, and accurate.
          </p>
        </section>

        {/* Calculator Card */}
        <section id="calculator" className="max-w-4xl mx-auto">
          <article className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100">
            {/* Unit Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-lg p-1 inline-flex">
                <button
                  onClick={() => setUnit('metric')}
                  className={`px-6 py-2 rounded-md font-medium transition ${
                    unit === 'metric'
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Metric (kg, cm)
                </button>
                <button
                  onClick={() => setUnit('imperial')}
                  className={`px-6 py-2 rounded-md font-medium transition ${
                    unit === 'imperial'
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Imperial (lbs, in)
                </button>
              </div>
            </div>

            {/* Input Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Weight Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-lg"
                    min="1"
                    max={unit === 'metric' ? '300' : '660'}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Height Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Height {unit === 'metric' ? '(cm)' : '(inches)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-lg"
                    min="1"
                    max={unit === 'metric' ? '300' : '120'}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleClear}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Clear
              </button>
            </div>

            {/* Results Section */}
            {bmi && (
              <div className="space-y-6 animate-fadeIn">
                {/* BMI Value Card */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">Your BMI</p>
                      <p className="text-5xl font-bold text-gray-900">{bmi}</p>
                    </div>
                    <div className={`px-6 py-3 ${getCategoryBg()} rounded-lg`}>
                      <p className={`text-lg font-bold ${getCategoryColor()}`}>
                        {category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Health Tip Card */}
                <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Health Recommendation</h3>
                      <p className="text-gray-600 leading-relaxed">{healthTip}</p>
                    </div>
                  </div>
                </div>

                {/* BMI Scale Reference */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">BMI Categories</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Underweight</span>
                      <span className="text-sm font-semibold text-blue-600">&lt; 18.5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Normal Weight</span>
                      <span className="text-sm font-semibold text-green-600">18.5 - 24.9</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Overweight</span>
                      <span className="text-sm font-semibold text-orange-600">25 - 29.9</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Obese</span>
                      <span className="text-sm font-semibold text-red-600">≥ 30</span>
                    </div>
                  </div>
                </div>

                {/* Copy Result Button */}
                <button
                  onClick={handleCopy}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy Result
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Empty State */}
            {!bmi && (
              <div className="text-center py-12 text-gray-400">
                <Scale className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Enter your weight and height to calculate BMI</p>
              </div>
            )}
          </article>

          {/* Newsletter CTA */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">Get Personalized Health Tips</h3>
            <p className="mb-6 opacity-90">Subscribe to receive weekly health insights and nutrition advice</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* About BMI Section */}
        <section id="about" className="mt-16 max-w-4xl mx-auto">
          <article className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is BMI?</h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p>
                Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in metres squared.
              </p>
              <p>
                BMI is a useful measurement for most people over 18 years old. However, it's only an estimate and doesn't account for factors like muscle mass, bone density, overall body composition, and racial and sex differences.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Calculate Your BMI?</h3>
              <ul className="space-y-2">
                <li>✓ Quick health screening tool</li>
                <li>✓ Track weight management progress</li>
                <li>✓ Identify potential health risks</li>
                <li>✓ Set realistic fitness goals</li>
              </ul>
            </div>
          </article>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">BMI Calculator</h3>
              <p className="text-gray-400 text-sm">
                Free, accurate, and easy-to-use BMI calculator for tracking your health journey.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#calculator" className="hover:text-white transition">Calculator</a></li>
                <li><a href="#about" className="hover:text-white transition">About BMI</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Health Tips</a></li>
                <li><a href="#" className="hover:text-white transition">Nutrition Guide</a></li>
                <li><a href="#" className="hover:text-white transition">Fitness Plans</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-gray-400 text-sm">
                Questions? Reach out to us at<br />
                <a href="mailto:support@bmicalc.com" className="text-blue-400 hover:text-blue-300">
                  support@bmicalc.com
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 BMI Calculator. All rights reserved. Made with ❤️ for your health.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}