import { useState } from 'react';
import { Search, Calendar, MapPin, Briefcase } from 'lucide-react';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { authors, getQuotesByAuthor, Author } from '../../data/mockData';

interface AuthorsPageProps {
  onAuthorClick: (authorId: string) => void;
}

export function AuthorsPage({ onAuthorClick }: AuthorsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'profession' | 'nationality'>('name');

  const filteredAuthors = authors
    .filter(author =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.nationality.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'profession':
          return a.profession.localeCompare(b.profession);
        case 'nationality':
          return a.nationality.localeCompare(b.nationality);
        default:
          return 0;
      }
    });

  const getAuthorQuoteCount = (authorId: string) => {
    return getQuotesByAuthor(authorId).length;
  };

  const formatBirthDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculateAge = (birthDate: string, deathDate?: string) => {
    const birth = new Date(birthDate);
    const end = deathDate ? new Date(deathDate) : new Date();
    const age = end.getFullYear() - birth.getFullYear();
    const monthDiff = end.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Authors</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore quotes from history's most influential thinkers, leaders, and visionaries
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Input
                type="text"
                placeholder="Search authors by name, profession, or nationality..."
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
                variant={sortBy === 'profession' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('profession')}
              >
                Sort by Profession
              </Button>
              <Button
                variant={sortBy === 'nationality' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('nationality')}
              >
                Sort by Nationality
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAuthors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No authors found matching your search.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredAuthors.length} of {authors.length} authors
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAuthors.map((author) => (
                  <Card
                    key={author.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
                    onClick={() => onAuthorClick(author.id)}
                  >
                    <CardContent className="p-6">
                      {/* Author Avatar */}
                      <div className="text-center mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                          <span className="text-2xl font-bold text-primary">
                            {author.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {author.name}
                        </h3>
                      </div>

                      {/* Author Details */}
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{author.profession}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{author.nationality}</span>
                        </div>

                        {author.birthDate && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <span>
                              {formatBirthDate(author.birthDate)}
                              {author.deathDate ? (
                                <span className="text-gray-500">
                                  {' '}({calculateAge(author.birthDate, author.deathDate)} years)
                                </span>
                              ) : (
                                <span className="text-gray-500">
                                  {' '}(Age {calculateAge(author.birthDate)})
                                </span>
                              )}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Quote Count */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {getAuthorQuoteCount(author.id)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {getAuthorQuoteCount(author.id) === 1 ? 'Quote' : 'Quotes'}
                          </div>
                        </div>
                      </div>

                      {/* Bio Preview */}
                      {author.bio && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {author.bio}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Featured Authors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Authors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {authors.slice(0, 3).map((author) => (
              <Card
                key={author.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => onAuthorClick(author.id)}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-primary">
                      {author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{author.name}</h3>
                  <p className="text-primary font-semibold mb-3">{author.profession}</p>
                  
                  {author.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {author.bio}
                    </p>
                  )}
                  
                  <div className="text-lg font-bold text-accent">
                    {getAuthorQuoteCount(author.id)} {getAuthorQuoteCount(author.id) === 1 ? 'Quote' : 'Quotes'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}