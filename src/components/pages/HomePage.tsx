import { useState, useEffect } from 'react';
import { Shuffle, TrendingUp, Users, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { QuoteCard } from '../QuoteCard';
import { 
  quotes, 
  authors, 
  categories, 
  getFeaturedQuotes, 
  getDailyQuote,
  Quote,
  Author,
  Category
} from '../../data/mockData';

interface HomePageProps {
  onAuthorClick: (authorId: string) => void;
  onCategoryClick: (categoryId: string) => void;
  onNavigate: (page: string) => void;
}

export function HomePage({ onAuthorClick, onCategoryClick, onNavigate }: HomePageProps) {
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const dailyQuote = getDailyQuote();
  const featuredQuotes = getFeaturedQuotes().slice(0, 6);
  const popularAuthors = authors.slice(0, 8);
  const popularTopics = categories.slice(0, 8);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  const todaysBirthdays = authors.filter(author => {
    if (!author.birthDate) return false;
    const today = new Date();
    const birthDate = new Date(author.birthDate);
    return birthDate.getMonth() === today.getMonth() && birthDate.getDate() === today.getDate();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Inspire Your Day
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover thousands of inspirational quotes from the world's greatest minds
            </p>
          </div>

          {/* Daily Quote */}
          {dailyQuote && (
            <div className="max-w-4xl mx-auto mb-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quote of the Day</h2>
                <p className="text-gray-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <QuoteCard
                quote={dailyQuote}
                onAuthorClick={onAuthorClick}
                onCategoryClick={onCategoryClick}
                className="bg-white/80 backdrop-blur-sm"
              />
            </div>
          )}

          {/* Random Quote Generator */}
          <div className="text-center">
            <Button
              onClick={getRandomQuote}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Shuffle className="w-5 h-5 mr-2" />
              Get Random Quote
            </Button>
          </div>

          {/* Random Quote Display */}
          {randomQuote && (
            <div className="max-w-4xl mx-auto mt-8">
              <QuoteCard
                quote={randomQuote}
                onAuthorClick={onAuthorClick}
                onCategoryClick={onCategoryClick}
                className="bg-white/80 backdrop-blur-sm"
              />
            </div>
          )}
        </div>
      </section>

      {/* Featured Quotes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Quotes</h2>
            <Button
              variant="outline"
              onClick={() => onNavigate('quotes')}
              className="text-primary border-primary hover:bg-primary hover:text-white"
            >
              View All Quotes
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                onAuthorClick={onAuthorClick}
                onCategoryClick={onCategoryClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Authors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Authors</h2>
            <Button
              variant="outline"
              onClick={() => onNavigate('authors')}
              className="text-primary border-primary hover:bg-primary hover:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              View All Authors
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {popularAuthors.map((author) => (
              <Card
                key={author.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => onAuthorClick(author.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-primary">
                      {author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">{author.name}</h3>
                  <p className="text-xs text-gray-600">{author.profession}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Topics</h2>
            <Button
              variant="outline"
              onClick={() => onNavigate('topics')}
              className="text-primary border-primary hover:bg-primary hover:text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              View All Topics
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {popularTopics.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => onCategoryClick(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Birthdays */}
      {todaysBirthdays.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Today's Birthdays</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todaysBirthdays.map((author) => (
                <Card
                  key={author.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => onAuthorClick(author.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {author.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{author.name}</h3>
                        <p className="text-gray-600">{author.profession}</p>
                        <p className="text-sm text-gray-500">
                          Born {new Date(author.birthDate!).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">{quotes.length.toLocaleString()}</div>
              <div className="text-gray-600">Inspirational Quotes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">{authors.length.toLocaleString()}</div>
              <div className="text-gray-600">Famous Authors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">{categories.length.toLocaleString()}</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}