import { useState, useEffect } from 'react';
import { Calendar, Clock, Shuffle, Share2, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { QuoteCard } from '../QuoteCard';
import { getDailyQuote, quotes, Quote } from '../../data/mockData';

interface DailyQuotePageProps {
  onAuthorClick: (authorId: string) => void;
  onCategoryClick: (categoryId: string) => void;
}

export function DailyQuotePage({ onAuthorClick, onCategoryClick }: DailyQuotePageProps) {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [previousQuotes, setPreviousQuotes] = useState<Quote[]>([]);
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    // Set the daily quote
    const dailyQuote = getDailyQuote();
    setCurrentQuote(dailyQuote || quotes[0]);

    // Generate some "previous" daily quotes for demo
    const shuffled = [...quotes].sort(() => 0.5 - Math.random());
    setPreviousQuotes(shuffled.slice(0, 6));

    // Update countdown timer
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilNext(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateNewDailyQuote = () => {
    const availableQuotes = quotes.filter(q => q.id !== currentQuote?.id);
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    setCurrentQuote(availableQuotes[randomIndex]);
  };

  const shareQuote = async () => {
    if (!currentQuote) return;

    const shareData = {
      title: 'Daily Quote',
      text: `"${currentQuote.text}" - Today's inspirational quote`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(`"${currentQuote.text}" - ${shareData.url}`);
        alert('Quote copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const downloadQuoteImage = () => {
    // This would typically generate an image with the quote
    // For now, we'll just show an alert
    alert('Quote image download feature coming soon!');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const today = new Date();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Quote of the Day
            </h1>
            <div className="flex items-center justify-center space-x-2 text-lg text-gray-600 mb-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(today)}</span>
            </div>
            <p className="text-gray-600">
              Start your day with inspiration and wisdom
            </p>
          </div>

          {/* Daily Quote */}
          {currentQuote && (
            <div className="max-w-4xl mx-auto mb-8">
              <QuoteCard
                quote={currentQuote}
                onAuthorClick={onAuthorClick}
                onCategoryClick={onCategoryClick}
                className="bg-white/90 backdrop-blur-sm shadow-xl"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={shareQuote}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Quote
            </Button>
            
            <Button
              onClick={downloadQuoteImage}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Image
            </Button>
            
            <Button
              onClick={generateNewDailyQuote}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-white"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              New Daily Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Countdown to Next Quote */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Daily Quote In</h2>
          
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-2 text-3xl font-bold text-primary mb-4">
                <Clock className="w-8 h-8" />
                <span>{timeUntilNext}</span>
              </div>
              <p className="text-gray-600">
                A new inspirational quote will be available tomorrow
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Previous Daily Quotes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Previous Daily Quotes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousQuotes.map((quote, index) => {
              const date = new Date();
              date.setDate(date.getDate() - (index + 1));
              
              return (
                <Card key={quote.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-500">
                        {date.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        Day -{index + 1}
                      </div>
                    </div>
                    
                    <QuoteCard
                      quote={quote}
                      onAuthorClick={onAuthorClick}
                      onCategoryClick={onCategoryClick}
                      className="border-0 shadow-none p-0"
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Daily Quote Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Daily Quotes?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌅</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Start Your Day Right</h3>
                <p className="text-gray-600">
                  Begin each morning with a dose of inspiration and motivation to set a positive tone for your day.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Daily Wisdom</h3>
                <p className="text-gray-600">
                  Discover new perspectives and insights from history's greatest minds, one quote at a time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💪</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Build Habits</h3>
                <p className="text-gray-600">
                  Create a daily routine of reflection and inspiration that helps you grow and stay motivated.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Never Miss a Daily Quote
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get inspired every day with our curated selection of motivational quotes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button className="bg-primary hover:bg-primary/90 text-white flex-1">
              Enable Notifications
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white flex-1">
              Email Reminders
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}