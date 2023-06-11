

export const Address = ({invisible,onClose,children})=>{
    if (!invisible) return null;

    const handleClose = (e) =>{
        if(e.target.id ==='wrapper') onClose();
    }
    return(

        <div className=" fixed inset-0 bg-black bg-opacity-25 
        backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
           <div className="w-96 bg-white rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 text-2xl hover:text-gray-800 focus:outline-none"
          onClick={() => onClose()}
        >
          &times;
        </button>
        {children}
      </div>
            
           </div>
               
    )


}