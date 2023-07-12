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
    <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
      {images.map(image=>(
         
          <div key={image.imageURL} className="card w-full bg-base-100 shadow-xl">
          <figure  className="max-h-[15rem]" ><embed        
              src={image.imageURL}
              type="application/pdf"
              height="100%"
              width="100%"
            ></embed></figure>
          <div className="card-body flex ">
              <div className="badge badge-outline">{image.userEmail}</div> 
              <div className="badge badge-outline">{image.createdAt.toLocaleDateString()}</div>
          </div>
              </div>
      ))}
        
    </div>
  )
}

export default ImageGallery
