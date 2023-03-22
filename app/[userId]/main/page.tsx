import LogOut from "./LogOut";

// Note to self: can't do async in client components
export default function UserPage({params: {userId}} : Params) {
  
  return (
    <div>
        Main 
        {/* Temporary */}
        <LogOut />
    </div>
  )
}
