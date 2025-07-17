import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { AuthorsPage } from './components/pages/AuthorsPage';
import { TopicsPage } from './components/pages/TopicsPage';
import { DailyQuotePage } from './components/pages/DailyQuotePage';
import { SearchResultsPage } from './components/pages/SearchResultsPage';

type Page = 'home' | 'authors' | 'topics' | 'daily' | 'search';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleAuthorClick = (authorId: string) => {
    // For now, just navigate to authors page
    // In a full implementation, this would show author details
    setCurrentPage('authors');
  };

  const handleCategoryClick = (categoryId: string) => {
    // For now, just navigate to topics page
    // In a full implementation, this would show category details
    setCurrentPage('topics');
  };



  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'authors':
        return (
          <AuthorsPage
            onAuthorClick={handleAuthorClick}
          />
        );
      case 'topics':
        return (
          <TopicsPage
            onCategoryClick={handleCategoryClick}
          />
        );
      case 'daily':
        return (
          <DailyQuotePage
            onAuthorClick={handleAuthorClick}
            onCategoryClick={handleCategoryClick}
          />
        );
      case 'search':
        return (
          <SearchResultsPage
            initialQuery={searchQuery}
            onAuthorClick={handleAuthorClick}
            onCategoryClick={handleCategoryClick}
            onSearch={handleSearch}
          />
        );
      case 'home':
      default:
        return (
          <HomePage
            onAuthorClick={handleAuthorClick}
            onCategoryClick={handleCategoryClick}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      
      <main>
        {renderCurrentPage()}
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;