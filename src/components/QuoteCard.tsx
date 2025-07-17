import { useState } from 'react';
import { Heart, Share2, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Quote, Author, Category, getAuthorById, getCategoryById } from '../data/mockData';

interface QuoteCardProps {
  quote: Quote;
  onAuthorClick?: (authorId: string) => void;
  onCategoryClick?: (categoryId: string) => void;
  className?: string;
}

export function QuoteCard({ quote, onAuthorClick, onCategoryClick, className = '' }: QuoteCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [likesCount, setLikesCount] = useState(quote.likesCount);

  const author = getAuthorById(quote.authorId);
  const category = getCategoryById(quote.categoryId);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" - ${author?.name}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quote by ' + author?.name,
          text: `"${quote.text}" - ${author?.name}`,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary ${className}`}>
      <CardContent className="p-6">
        {/* Quote Text */}
        <blockquote className="text-lg text-gray-800 leading-relaxed mb-4 font-medium">
          "{quote.text}"
        </blockquote>

        {/* Author and Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onAuthorClick?.(quote.authorId)}
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              — {author?.name}
            </button>
            {category && (
              <>
                <span className="text-gray-400">•</span>
                <button
                  onClick={() => onCategoryClick?.(quote.categoryId)}
                  className="text-sm text-gray-600 hover:text-primary transition-colors bg-gray-100 px-2 py-1 rounded-full"
                >
                  {category.name}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`transition-colors ${
                isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {likesCount}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              {isCopied ? (
                <Check className="w-4 h-4 mr-1" />
              ) : (
                <Copy className="w-4 h-4 mr-1" />
              )}
              {isCopied ? 'Copied!' : 'Copy'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>

          {quote.isDailyQuote && (
            <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
              Daily Quote
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}