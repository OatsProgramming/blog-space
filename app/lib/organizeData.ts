import quickSortByTime from "./quickSort"

export function filterPosts(posts: PostObj[], subscribedTo: string[]): {
    sortedPosts: PostObj[],
    filteredPost: PostMap
}{
    const sortedPosts = quickSortByTime(posts) as PostObj[]
    // Organize posts by userId w/ hashmap

    // Create a new Set: this would help cut the time complexity down when searching
    // Avoids duplicate userId && 
    // Set.has() time O(1) < Array.prototype.includes() time O(n) 
    const desiredUsers = new Set(subscribedTo)
    const filteredPosts: PostMap = new Map()
    for (let post of sortedPosts){
        if (filteredPosts.has(post.userId)){
            filteredPosts.get(post.userId)?.push(post)
        } else {
            if (desiredUsers.has(post.userId)){
                filteredPosts.set(post.userId, [post])
            }
        }
    }
    // Overall time complexity here: O(n) due to iterating posts

    // Returning as an object for more ease of use
    return ({
        sortedPosts: sortedPosts,
        filteredPost: filteredPosts
    })
}