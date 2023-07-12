import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Navbar = () => {
  const handleSignOut = async ()=>{
    try{
      await signOut(auth);
    } catch(error){
      console.log(error);
    }
  }
  return (
    <div className="flex">

    <div className="navbar bg-base-100">
  <a className="btn btn-ghost normal-case text-xl">PhotoGram</a>
</div>
    <button onClick={handleSignOut} className="btn mt-2">Log Out</button>
    </div>
  
  )
}

export default Navbar
