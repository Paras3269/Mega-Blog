import { use } from 'react';
import conf from '../conf/conf'
import { Client, Account, ID ,Databases,Storage,Query,TablesDB} from "appwrite";

export class Service{

    client = new Client();
    databases;
    bucket;

    constructor(){
         this.client
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectId);
           this.databases = new TablesDB(this.client);
           this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status ,userId}){
        try {
            return await this.databases.createRow({
                databaseId:conf.appwriteDatabaseId,
                tableId:conf.appwriteCollectionId,
                rowId:slug,
                data:{
                    title:title,
                    content:content,
                    featuredImage:featuredImage,
                    status:status,
                    userId:userId,
                }
            })
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error",error);
            
        }
    }

    async updatePost(slug,{title,content,featuredImage,status }){
        try {
            return await this.databases.updateRow({
              databaseId:conf.appwriteDatabaseId,
                tableId:conf.appwriteCollectionId,
               rowId: slug,
               data: {
                    title:title,
                    content:content,
                    featuredImage:featuredImage,
                    status:status
                }
        });
        } catch (error) {
             console.log("Appwrite serive :: updatePost :: error",error);
        }
    }
    

    async deletePost(slug){
        try {
            await this.databases.deleteRow({
               databaseId:conf.appwriteDatabaseId,
                tableId:conf.appwriteCollectionId,
               rowId: slug,
            })
            return true
        } catch (error) {
             console.log("Appwrite serive :: deletePost :: error",error);
             return false
        }
    }
  
    async getPost(slug){
        try {
            return await this.databases.getRow({
                 databaseId:conf.appwriteDatabaseId,
                tableId:conf.appwriteCollectionId,
               rowId: slug,
            })
        } catch (error) {
              console.log("Appwrite serive :: getPost :: error",error);
             return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
          return await this.databases.listRows({
                 databaseId:conf.appwriteDatabaseId,
                tableId:conf.appwriteCollectionId,
                queries:queries
            })
            
        } catch (error) {
             console.log("Appwrite serive :: getPosts :: error",error);
             return false
        }
    }

    //file upload serive

    async uploadFile(file){
      try {
        return await this.bucket.createFile({
            bucketId:conf.appwriteBucketId,
            fileId:ID.unique(),
            file:file
        })
      } catch (error) {
        console.log("Appwrite serive :: uploadFile :: error",error);
             return false
        }
      }

      async deleteFile (fileId){
        try {
            await this.bucket.deleteFile({
                bucketId:conf.appwriteBucketId,
                fileId:fileId
            })
            return true
        } catch (error) {
             console.log("Appwrite serive :: deleteFile :: error",error);
             return false
        }
      }

      getFilePreview(fileId){
        return this.bucket.getFilePreview({
            bucketId:conf.appwriteBucketId,
            fileId:fileId

        })
      }
      getFileView(fileId){
          return this.bucket.getFileView({
            bucketId:conf.appwriteBucketId,
            fileId:fileId

        })
     }

    

}

const service = new Service()

export default service

