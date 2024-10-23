import React, { useEffect, useState } from 'react';
import appwriteservice from '../appwrite/config';
import { Container, Postcard } from '../component';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const posts = await appwriteservice.getPosts();
                if (posts) {
                    setPosts(posts.documents);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-gray-50">
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-4 w-full'>
                            <h1 className="text-3xl font-bold text-gray-800 hover:text-gray-600 transition duration-300">
                                Login To Read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8 bg-gray-50">
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <Postcard 
                                {...post} 
                                className="transition-transform transform hover:scale-105 shadow-lg rounded-lg overflow-hidden bg-white"
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
