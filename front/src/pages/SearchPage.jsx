import React, { useState } from 'react';
import '../styles/search.scss';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import SearchInput from '../components/SearchInput';
import CategoryGrid from '../components/CategoryGrid';
import SearchResults from '../components/SearchResults';

function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className='main_container'>
      <Header />
      
      <SearchInput value={query} onChange={setQuery} />

      <div className="search_content_area">
        {query.trim() === '' ? (
          <CategoryGrid />
        ) : (
          <SearchResults keyword={query} />
        )}
      </div>

      <TabBar />
    </div>
  );
}

export default SearchPage;
