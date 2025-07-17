import { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { QuoteCard } from '../QuoteCard';
import { searchQuotes, categories, authors, Quote } from '../../data/mockData';

interface SearchResultsPageProps {
  initialQuery: string;
  onAuthorClick: (authorId: string) => void;
  onCategoryClick: (categoryId: string) => void;
  onSearch: (query: string) => void;
}

export function SearchResultsPage({ 
  initialQuery, 
  onAuthorClick, 
  onCategoryClick, 
  onSearch 
}: SearchResultsPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<Quote[]>([]);
  const [filteredResults, setFilteredResults] = useState<Quote[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [authorFilter, setAuthorFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'author' | 'likes'>('relevance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const searchResults = searchQuotes(searchQuery);
    setResults(searchResults);
  }, [searchQuery]);

  useEffect(() => {
    let filtered = [...results];

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(quote => quote.categoryId === categoryFilter);
    }

    // Apply author filter
    if (authorFilter !== 'all') {
      filtered = filtered.filter(quote => quote.authorId === authorFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'author': {
          const authorA = authors.find(author => author.id === a.authorId)?.name || '';
          const authorB = authors.find(author => author.id === b.authorId)?.name || '';
          comparison = authorA.localeCompare(authorB);
          break;
        }
        case 'likes':
          comparison = a.likesCount - b.likesCount;
          break;
        case 'relevance':
        default: {
          // For relevance, prioritize exact matches and featured quotes
          const aRelevance = (a.text.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 0) + 
                           (a.isFeatured ? 1 : 0);
          const bRelevance = (b.text.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 0) + 
                           (b.isFeatured ? 1 : 0);
          comparison = bRelevance - aRelevance;
          break;
        }
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredResults(filtered);
  }, [results, categoryFilter, authorFilter, sortBy, sortOrder, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const clearFilters = () => {
    setCategoryFilter('all');
    setAuthorFilter('all');
    setSortBy('relevance');
    setSortOrder('desc');
  };

  const getResultsText = () => {
    if (filteredResults.length === 0) {
      return `No results found for "${searchQuery}"`;
    }
    
    const totalResults = results.length;
    const filteredCount = filteredResults.length;
    
    if (totalResults === filteredCount) {
      return `${totalResults} result${totalResults === 1 ? '' : 's'} for "${searchQuery}"`;
    } else {
      return `${filteredCount} of ${totalResults} result${totalResults === 1 ? '' : 's'} for "${searchQuery}"`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search quotes, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </form>

          {/* Results Count */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Search Results</h1>
            <p className="text-gray-600">{getResultsText()}</p>
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Topics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Author Filter */}
              <Select value={authorFilter} onValueChange={setAuthorFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Authors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Authors</SelectItem>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {(categoryFilter !== 'all' || authorFilter !== 'all' || sortBy !== 'relevance') && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Sorting */}
            <div className="flex items-center space-x-2">
              <Select value={sortBy} onValueChange={(value: 'relevance' | 'author' | 'likes') => setSortBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="likes">Likes</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResults.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No results found</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              
              {/* Search Suggestions */}
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Try searching for:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['motivation', 'success', 'wisdom', 'happiness', 'leadership'].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        onSearch(suggestion);
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((quote) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  onAuthorClick={onAuthorClick}
                  onCategoryClick={onCategoryClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Search Tips */}
      {results.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Search by Keywords</h3>
                <p>Use specific words or phrases that appear in quotes</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Search by Author</h3>
                <p>Enter an author's name to find all their quotes</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Search by Topic</h3>
                <p>Use topic names like "motivation" or "success"</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}