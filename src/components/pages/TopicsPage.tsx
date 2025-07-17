import { useState } from 'react';
import { Search, BookOpen, TrendingUp } from 'lucide-react';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { categories, getQuotesByCategory, Category } from '../../data/mockData';

interface TopicsPageProps {
  onCategoryClick: (categoryId: string) => void;
}

export function TopicsPage({ onCategoryClick }: TopicsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'quotes'>('name');

  const getCategoryQuoteCount = (categoryId: string) => {
    return getQuotesByCategory(categoryId).length;
  };

  const filteredCategories = categories
    .filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'quotes':
          return getCategoryQuoteCount(b.id) - getCategoryQuoteCount(a.id);
        default:
          return 0;
      }
    });

  const topCategories = categories
    .sort((a, b) => getCategoryQuoteCount(b.id) - getCategoryQuoteCount(a.id))
    .slice(0, 3);

  const getCategoryIcon = (categoryName: string) => {
    const iconMap: { [key: string]: string } = {
      'Motivational': '💪',
      'Wisdom': '🧠',
      'Success': '🏆',
      'Happiness': '😊',
      'Love': '❤️',
      'Life': '🌱',
      'Inspirational': '✨',
      'Leadership': '👑',
      'Education': '📚',
      'Friendship': '🤝'
    };
    return iconMap[categoryName] || '💭';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Topics</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover quotes organized by themes and topics that matter to you
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Input
                type="text"
                placeholder="Search topics by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <div className="flex justify-center space-x-2">
              <Button
                variant={sortBy === 'name' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('name')}
              >
                Sort by Name
              </Button>
              <Button
                variant={sortBy === 'quotes' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('quotes')}
              >
                Sort by Quote Count
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Most Popular Topics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topCategories.map((category, index) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
                onClick={() => onCategoryClick(category.id)}
              >
                <div className="absolute top-4 right-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    #{index + 1}
                  </div>
                </div>
                
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">
                    {getCategoryIcon(category.name)}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-lg font-bold">
                      {getCategoryQuoteCount(category.id)} quotes
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No topics found matching your search.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredCategories.length} of {categories.length} topics
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
                    onClick={() => onCategoryClick(category.id)}
                  >
                    <CardContent className="p-6 text-center">
                      {/* Category Icon */}
                      <div className="text-4xl mb-4">
                        {getCategoryIcon(category.name)}
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {category.description}
                      </p>
                      
                      {/* Quote Count */}
                      <div className="flex items-center justify-center space-x-2 text-primary">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-semibold">
                          {getCategoryQuoteCount(category.id)} quotes
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Browse by Theme */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Theme</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                onClick={() => onCategoryClick(category.id)}
              >
                <span className="text-2xl">{getCategoryIcon(category.name)}</span>
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs opacity-70">
                  {getCategoryQuoteCount(category.id)} quotes
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore by Numbers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {categories.length}
                </div>
                <div className="text-gray-600">Total Topics</div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {Math.max(...categories.map(cat => getCategoryQuoteCount(cat.id)))}
                </div>
                <div className="text-gray-600">Most Quotes in a Topic</div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {Math.round(categories.reduce((sum, cat) => sum + getCategoryQuoteCount(cat.id), 0) / categories.length)}
                </div>
                <div className="text-gray-600">Average Quotes per Topic</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}