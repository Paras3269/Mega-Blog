import React,{use, useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import { Container,PostCard } from '../components';

function AllPosts() {
    const[posts,setPosts] = useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((response)=>{
            console.log(response);
            
            if(response && response.rows){
                setPosts(response.rows)
            }
        })
    },[])
    console.log(posts);
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        
                        
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts