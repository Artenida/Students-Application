import { useEffect, useRef, useState } from "react";
import Card, { Paginated } from "../../components/Forum/Card";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  filterPosts,
  retrieveAllPosts,
  retrievePaginatedPosts,
} from "../../api/postThunk";
import { selectPost } from "../../redux/forum/postSlice";
import PaginationButtons from "../../components/Forum/PaginationButtons";
import Loading from "../../components/Loading";

const Forum = () => {
  const dispatch = useAppDispatch();
  const { paginatedPost, loading, retrieveError } = useAppSelector(selectPost);
  const { currentPost } = useAppSelector(selectPost);
  const [currentBlogs, setCurrentBlogs] = useState<Paginated[]>([]);
  const [allPosts, setAllPosts] = useState<Paginated[]>([]);
  const currentPageRef = useRef<number>(1);
  const limit = 9;
  const [pageCount, setPageCount] = useState(1);
  const [keyword, setKeyword] = useState("New");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    dispatch(filterPosts({ keyword: keyword }));
  }, [dispatch, keyword]);

  useEffect(() => {
    getPaginatedPosts();
  }, [dispatch]);

  useEffect(() => {
    if (paginatedPost?.result) {
      setCurrentBlogs(paginatedPost.result);
    }
  }, [paginatedPost]);

  useEffect(() => {
    dispatch(retrieveAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (currentPost) {
      setAllPosts(currentPost);
    }
  }, [currentPost]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    currentPageRef.current = selectedItem.selected + 1;
    getPaginatedPosts();
  };

  const getPaginatedPosts = () => {
    dispatch(
      retrievePaginatedPosts({ currentPage: currentPageRef.current, limit })
    );
    setPageCount(paginatedPost?.pageCount ?? 1);
  };

  const filter = (searchValue: string) => {
    setKeyword(searchValue);
    setSearching(searchValue.trim().length > 0);

    if (!allPosts) return;

    const filteredPosts = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        post.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        post.username.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCurrentBlogs(filteredPosts);
  };

  return (
    <div className="min-h-screen bg-custom-color1 w-full">
      <div className="">
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : retrieveError ? (
          <div>Error: {retrieveError}</div>
        ) : (
          <div>
            {currentBlogs.map((blog) => (
              <Card
                key={blog.id}
                id={blog.id}
                username={blog.username}
                createdAt={blog.createdAt}
                title={blog.title}
                description={blog.description}
                profile_picture={blog.profile_picture}
                images={blog.images}
              />
            ))}
          </div>
        )}

        {!searching && (
          <PaginationButtons
            pageCount={pageCount}
            onPageChange={handlePageClick}
          />
        )}
      </div>
    </div>
  );
};

export default Forum;
