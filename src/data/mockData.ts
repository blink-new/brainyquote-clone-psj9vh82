export interface Author {
  id: string;
  name: string;
  bio: string;
  birthDate?: string;
  deathDate?: string;
  profession: string;
  nationality: string;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Quote {
  id: string;
  text: string;
  authorId: string;
  categoryId: string;
  isFeatured: boolean;
  isDailyQuote: boolean;
  dailyQuoteDate?: string;
  likesCount: number;
}

export const authors: Author[] = [
  {
    id: 'auth_einstein',
    name: 'Albert Einstein',
    bio: 'Theoretical physicist who developed the theory of relativity',
    birthDate: '1879-03-14',
    profession: 'Physicist',
    nationality: 'German-American'
  },
  {
    id: 'auth_jobs',
    name: 'Steve Jobs',
    bio: 'Co-founder and CEO of Apple Inc.',
    birthDate: '1955-02-24',
    profession: 'Entrepreneur',
    nationality: 'American'
  },
  {
    id: 'auth_gandhi',
    name: 'Mahatma Gandhi',
    bio: 'Leader of the Indian independence movement',
    birthDate: '1869-10-02',
    profession: 'Political Leader',
    nationality: 'Indian'
  },
  {
    id: 'auth_mandela',
    name: 'Nelson Mandela',
    bio: 'Anti-apartheid revolutionary and former President of South Africa',
    birthDate: '1918-07-18',
    profession: 'Political Leader',
    nationality: 'South African'
  },
  {
    id: 'auth_roosevelt',
    name: 'Theodore Roosevelt',
    bio: '26th President of the United States',
    birthDate: '1858-10-27',
    profession: 'President',
    nationality: 'American'
  },
  {
    id: 'auth_churchill',
    name: 'Winston Churchill',
    bio: 'British Prime Minister during World War II',
    birthDate: '1874-11-30',
    profession: 'Prime Minister',
    nationality: 'British'
  },
  {
    id: 'auth_lincoln',
    name: 'Abraham Lincoln',
    bio: '16th President of the United States',
    birthDate: '1809-02-12',
    profession: 'President',
    nationality: 'American'
  },
  {
    id: 'auth_king',
    name: 'Martin Luther King Jr.',
    bio: 'Civil rights leader',
    birthDate: '1929-01-15',
    profession: 'Civil Rights Leader',
    nationality: 'American'
  },
  {
    id: 'auth_disney',
    name: 'Walt Disney',
    bio: 'Animator and film producer',
    birthDate: '1901-12-05',
    profession: 'Animator',
    nationality: 'American'
  },
  {
    id: 'auth_ford',
    name: 'Henry Ford',
    bio: 'Founder of Ford Motor Company',
    birthDate: '1863-07-30',
    profession: 'Industrialist',
    nationality: 'American'
  }
];

export const categories: Category[] = [
  { id: 'cat_motivational', name: 'Motivational', description: 'Inspiring quotes to motivate and encourage' },
  { id: 'cat_wisdom', name: 'Wisdom', description: 'Wise words and life lessons' },
  { id: 'cat_success', name: 'Success', description: 'Quotes about achieving success and goals' },
  { id: 'cat_happiness', name: 'Happiness', description: 'Quotes about joy and happiness' },
  { id: 'cat_love', name: 'Love', description: 'Quotes about love and relationships' },
  { id: 'cat_life', name: 'Life', description: 'Quotes about life and living' },
  { id: 'cat_inspirational', name: 'Inspirational', description: 'Uplifting and inspiring quotes' },
  { id: 'cat_leadership', name: 'Leadership', description: 'Quotes about leadership and management' },
  { id: 'cat_education', name: 'Education', description: 'Quotes about learning and education' },
  { id: 'cat_friendship', name: 'Friendship', description: 'Quotes about friendship and relationships' }
];

export const quotes: Quote[] = [
  {
    id: 'quote_1',
    text: 'Imagination is more important than knowledge.',
    authorId: 'auth_einstein',
    categoryId: 'cat_wisdom',
    isFeatured: true,
    isDailyQuote: true,
    dailyQuoteDate: new Date().toISOString().split('T')[0],
    likesCount: 1247
  },
  {
    id: 'quote_2',
    text: 'Innovation distinguishes between a leader and a follower.',
    authorId: 'auth_jobs',
    categoryId: 'cat_leadership',
    isFeatured: true,
    isDailyQuote: false,
    likesCount: 892
  },
  {
    id: 'quote_3',
    text: 'Be the change that you wish to see in the world.',
    authorId: 'auth_gandhi',
    categoryId: 'cat_inspirational',
    isFeatured: true,
    isDailyQuote: false,
    likesCount: 2156
  },
  {
    id: 'quote_4',
    text: 'It always seems impossible until it\'s done.',
    authorId: 'auth_mandela',
    categoryId: 'cat_motivational',
    isFeatured: true,
    isDailyQuote: false,
    likesCount: 1834
  },
  {
    id: 'quote_5',
    text: 'Believe you can and you\'re halfway there.',
    authorId: 'auth_roosevelt',
    categoryId: 'cat_motivational',
    isFeatured: true,
    isDailyQuote: false,
    likesCount: 1456
  },
  {
    id: 'quote_6',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    authorId: 'auth_churchill',
    categoryId: 'cat_success',
    isFeatured: true,
    isDailyQuote: false,
    likesCount: 1678
  },
  {
    id: 'quote_7',
    text: 'The best way to predict the future is to create it.',
    authorId: 'auth_lincoln',
    categoryId: 'cat_wisdom',
    isFeatured: false,
    isDailyQuote: false,
    likesCount: 934
  },
  {
    id: 'quote_8',
    text: 'Darkness cannot drive out darkness; only light can do that.',
    authorId: 'auth_king',
    categoryId: 'cat_inspirational',
    isFeatured: false,
    isDailyQuote: false,
    likesCount: 1123
  },
  {
    id: 'quote_9',
    text: 'All our dreams can come true, if we have the courage to pursue them.',
    authorId: 'auth_disney',
    categoryId: 'cat_motivational',
    isFeatured: false,
    isDailyQuote: false,
    likesCount: 1567
  },
  {
    id: 'quote_10',
    text: 'Whether you think you can or you think you can\'t, you\'re right.',
    authorId: 'auth_ford',
    categoryId: 'cat_success',
    isFeatured: false,
    isDailyQuote: false,
    likesCount: 876
  },
  {
    id: 'quote_11',
    text: 'Life is like riding a bicycle. To keep your balance, you must keep moving.',
    authorId: 'auth_einstein',
    categoryId: 'cat_life',
    isFeatured: false,
    isDailyQuote: false,
    likesCount: 1234
  },
  {
    id: 'quote_12',
    text: 'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.',
    authorId: 'auth_jobs',
    categoryId: 'cat_success',
    isFeatured: false,
    isDailyQuote: false,
    likesCount: 1445
  }
];

export const getAuthorById = (id: string): Author | undefined => {
  return authors.find(author => author.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getQuotesByAuthor = (authorId: string): Quote[] => {
  return quotes.filter(quote => quote.authorId === authorId);
};

export const getQuotesByCategory = (categoryId: string): Quote[] => {
  return quotes.filter(quote => quote.categoryId === categoryId);
};

export const getFeaturedQuotes = (): Quote[] => {
  return quotes.filter(quote => quote.isFeatured);
};

export const getDailyQuote = (): Quote | undefined => {
  return quotes.find(quote => quote.isDailyQuote);
};

export const searchQuotes = (query: string): Quote[] => {
  const lowercaseQuery = query.toLowerCase();
  return quotes.filter(quote => 
    quote.text.toLowerCase().includes(lowercaseQuery) ||
    getAuthorById(quote.authorId)?.name.toLowerCase().includes(lowercaseQuery) ||
    getCategoryById(quote.categoryId)?.name.toLowerCase().includes(lowercaseQuery)
  );
};