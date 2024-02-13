import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../auth/config";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setpost] = useState();

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setpost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [navigate, slug]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
