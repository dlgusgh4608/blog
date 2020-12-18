import React from 'react';
import { useSelector } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';
import SearchForm from '../../components/search/SearchForm';
import SearchItem from '../../components/search/SearchItem';

const Search = () => {
  const { searchPosts, searchPostsSuccess } = useSelector((state) => state.post);
  return (
    <MainLayout>
      <SearchForm searchPosts={searchPosts} searchPostsSuccess={searchPostsSuccess} />
      {searchPosts.map((v) => (
        <SearchItem key={v.post_id} data={v} />
      ))}
    </MainLayout>
  );
};

export default Search;
