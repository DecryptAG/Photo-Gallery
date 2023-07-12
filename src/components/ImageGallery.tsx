import useFirestore from "../hooks/useFirestore"
const ImageGallery = () => {
  const {docs: images, isLoading} = useFirestore('images');
  
  
  if(isLoading)
  {
    return (
      <div className="text-center mt-10">
          <progress className="progress w-56" max="100"></progress>
      </div>
    )
    
  }
  return (
    <div>
      {images.map(image=>(
         
          <div key={image.imageURL} className="card w-96 bg-base-100 shadow-xl">
          <figure><img src={image.imageURL}></img></figure>
          <div className="card-body">
              <div className="badge badge-outline">{image.userEmail}</div> 
              <div className="badge badge-outline">{image.createdAt.toLocaleDateString()}</div></div>
              </div>
      ))}
        
    </div>
  )
}

export default ImageGallery
