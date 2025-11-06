import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import type { Bakery, BakeryInput, BakeryWithAverage } from './types/bakery';
import { addAverageScores } from './lib/utils';
import BakeryForm from './components/BakeryForm';
import BakeryList from './components/BakeryList';
import ComparisonView from './components/ComparisonView';

type View = 'list' | 'add' | 'edit' | 'compare';

function App() {
  const [bakeries, setBakeries] = useState<BakeryWithAverage[]>([]);
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingBakery, setEditingBakery] = useState<Bakery | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch all bakeries on mount
  useEffect(() => {
    fetchBakeries();
  }, []);

  const fetchBakeries = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('bakeries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const bakeriesWithScores = addAverageScores(data || []);
      setBakeries(bakeriesWithScores);
    } catch (error) {
      console.error('Error fetching bakeries:', error);
      alert('Failed to load bakeries. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (data: BakeryInput) => {
    try {
      setIsSaving(true);
      const { error } = await supabase.from('bakeries').insert([data]);

      if (error) throw error;

      await fetchBakeries();
      setCurrentView('list');
      alert('Bakery added successfully!');
    } catch (error) {
      console.error('Error adding bakery:', error);
      alert('Failed to add bakery. Check console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (data: BakeryInput) => {
    if (!editingBakery) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('bakeries')
        .update(data)
        .eq('id', editingBakery.id);

      if (error) throw error;

      await fetchBakeries();
      setCurrentView('list');
      setEditingBakery(undefined);
      alert('Bakery updated successfully!');
    } catch (error) {
      console.error('Error updating bakery:', error);
      alert('Failed to update bakery. Check console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('bakeries').delete().eq('id', id);

      if (error) throw error;

      await fetchBakeries();
      alert('Bakery deleted successfully!');
    } catch (error) {
      console.error('Error deleting bakery:', error);
      alert('Failed to delete bakery. Check console for details.');
    }
  };

  const handleEdit = (bakery: BakeryWithAverage) => {
    setEditingBakery(bakery);
    setCurrentView('edit');
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingBakery(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            🥖 Capital District Food Scout
          </h1>
          <p className="mt-2 text-gray-600">
            Track and compare your favorite local bakeries
          </p>
        </header>

        {/* Navigation */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setCurrentView('list')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              currentView === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Bakeries ({bakeries.length})
          </button>
          <button
            onClick={() => setCurrentView('add')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              currentView === 'add'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            + Add New Bakery
          </button>
          <button
            onClick={() => setCurrentView('compare')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              currentView === 'compare'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Compare Bakeries
          </button>
        </div>

        {/* Main Content */}
        <main>
          {currentView === 'list' && (
            <BakeryList
              bakeries={bakeries}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          )}

          {currentView === 'add' && (
            <BakeryForm
              onSubmit={handleAdd}
              onCancel={handleCancel}
              isLoading={isSaving}
            />
          )}

          {currentView === 'edit' && editingBakery && (
            <BakeryForm
              bakery={editingBakery}
              onSubmit={handleUpdate}
              onCancel={handleCancel}
              isLoading={isSaving}
            />
          )}

          {currentView === 'compare' && <ComparisonView bakeries={bakeries} />}
        </main>
      </div>
    </div>
  );
}

export default App;
