import quickSortByTime from "./quickSort"

export function organizeData(posts: PostObj[], subscribedTo: string[]): {
    explorePosts: PostObj[]
    subscribedPosts: PostObj[],
}{
    const sortedPosts = quickSortByTime(posts) as PostObj[]

    // Create a new Set: this would help cut the time complexity down when searching
    // Avoids duplicate userId && 
    // Set.has() time O(1) < Array.prototype.includes() time O(n) 
    const desiredUsers = new Set(subscribedTo)
    const filteredPosts: PostObj[] = []
    for (let post of sortedPosts){
        if (desiredUsers.has(post.userId)){
            filteredPosts.push(post)
        }
    }
    // Overall time complexity here: O(n) due to iterating posts

    // Returning as an object for more ease of use
    return ({
        explorePosts: sortedPosts,
        subscribedPosts: filteredPosts
    })
}