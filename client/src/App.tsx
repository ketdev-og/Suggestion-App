import { useState, type FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import './App.css';

// Define types for our data structures
type HealthGoal = 'energy' | 'sleep' | 'focus';

type Suggestion = {
  name: string;
  description: string;
};

type HealthGoalOption = {
  value: HealthGoal;
  label: string;
};

function App() {
  const [age, setAge] = useState<string>('');
  const [goal, setGoal] = useState<HealthGoal | ''>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const healthGoals: HealthGoalOption[] = [
    { value: 'energy', label: 'Energy' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'focus', label: 'Focus' }
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuggestions([]);
    
    // Frontend validation
    if (!age || !goal) {
      setError('Please fill in all fields');
      return;
    }

    const ageNumber = Number(age);
    if (ageNumber < 0 || isNaN(ageNumber)) {
      setError('Please enter a valid age');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post<{ suggestions: Suggestion[] }>(
        'http://localhost:5000/suggestions', 
        {
          age: ageNumber,
          goal
        }
      );
      setSuggestions(response.data.suggestions);
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      setError(error.response?.data?.error || 'Failed to fetch suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Health Goal Suggestions</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
              Health Goal
            </label>
            <select
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value as HealthGoal | '')}
              className="mt-4 block w-full pl-3 pr-10 py-4 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a health goal</option>
              {healthGoals.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex cursor-pointer justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Getting Suggestions...' : 'Get Suggestions'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Your Suggestions</h2>
            <ul className="space-y-3">
              {suggestions.map((item, index) => (
                <li key={index} className="p-3 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-indigo-600">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;