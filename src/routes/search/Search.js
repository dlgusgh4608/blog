import React from 'react';
import { useSelector } from 'react-redux';
import PostsLayout from '../../components/layout/PostsLayout';
import SearchForm from '../../components/search/SearchForm';

const Search = () => {
  const { searchPosts, loadSearchPostsSuccess } = useSelector((state) => state.post);
  return (
    <PostsLayout posts={searchPosts}>
      <SearchForm searchPosts={searchPosts} loadSearchPostsSuccess={loadSearchPostsSuccess} />
    </PostsLayout>
  );
};

export default Search;
