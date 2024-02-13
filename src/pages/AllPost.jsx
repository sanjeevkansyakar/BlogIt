import { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import service from "../auth/config";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        {posts.length > 0 ? (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard
                  $id={post.$id}
                  featuredImage={post.featuredImage}
                  title={post.title}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            No Posts
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllPost;
