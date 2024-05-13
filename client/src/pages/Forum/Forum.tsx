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
import EventCard from "../../components/Forum/EventCard";
import { retrieveAllEvents } from "../../api/eventThunk";
import { selectEvent } from "../../redux/forum/eventSlice";
import Banner from "../../components/Forum/Banner";
import Searchbar from "../../components/Searchbar";
import ExtraInfo from "../../components/Forum/ExtraInfo";
import Sidebar from "../../components/Sidebar";

export interface EventType {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  details: string;
  user_id: string;
  image: string;
}

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
  const { currentEvents } = useAppSelector(selectEvent);

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

  useEffect(() => {
    dispatch(retrieveAllEvents());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Searchbar onChange={filter} />
      </div>

      <div className="flex-col gap-4 md:flex">
        <div className="ml-32">
          <div className="">
            <Banner />
          </div>
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
              user_id={blog.user_id}
            />
          ))}
        </div>

        <div>
          {currentEvents?.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              user_id={event.user_id}
              profile_picture={event.profile_picture}
              music={event.music}
            />
          ))}
          <ExtraInfo />
        </div>
      </div>

      {!searching && (
        <PaginationButtons
          pageCount={pageCount}
          onPageChange={handlePageClick}
        />
      )}
    </div>
  );
};

export default Forum;
