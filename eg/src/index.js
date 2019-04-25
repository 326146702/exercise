import addBLogs from './components/addBlogs'
import showBlogs from './components/showBlogs'
import SingleBlog from './components/SingleBlog'
export default [
    {
        path: "/add", component: addBLogs
    },
    {
        path: "/blog/:id", component: SingleBlog
    },
    {
        path: "/", component: showBlogs
    }
]