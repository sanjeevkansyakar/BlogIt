import { useNavigate } from "react-router-dom";
import service from "../auth/config";
import { Container, PostCard } from "../components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, [navigate]);

  if (!status) {
    return (
      <Container>
        <div className="flex flex-wrap h-screen">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500 ">
              Login to See Posts
            </h1>
          </div>
        </div>
      </Container>
    );
  }
  if (posts.length === 0) {
    return (
      <Container>
        <div className="flex flex-wrap  min-h-[52vh]">
          <div className="p-2 w-full flex justify-center items-center">
            <h1 className="text-2xl font-bold hover:text-gray-500 ">
              Add some post to See.
            </h1>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap ">
          {posts?.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
