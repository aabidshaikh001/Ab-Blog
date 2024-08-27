import React,{useEffect,useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteservice from '../appwrite/config'
import { Button, Container } from '../component'
import parse from "html-react-parser"
import { useSelector } from 'react-redux'



 
function Post() {
    const [post, setpost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state)=> state.auth.userData)

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(()=>{
        if (slug) {
            appwriteservice.getPost(slug).then((post)=>{
                if(post) setpost(post);
                else navigate("/")
            })
        }
    })
    const deletePost = () => {
        appwriteservice.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteservice.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };
  return post ? (
    <div className="py-8">
    <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img
                src={appwriteservice.getFilePreview(post.featuredimage)}
                alt={post.title}
                className="rounded-xl"
            />

            {isAuthor && (
                <div className="absolute right-6 top-6">
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500" className="mr-3">
                            Edit
                        </Button>
                    </Link>
                    <Button bgColor="bg-red-500" onClick={deletePost}>
                        Delete
                    </Button>
                </div>
            )}
        </div>
        <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
            {parse(post.content)}
            </div>
    </Container>
</div>
) : null;
}

export default Post