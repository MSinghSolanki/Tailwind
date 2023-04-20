

export const Address = ({invisible,onClose,children})=>{
    if (!invisible) return null;

    const handleClose = (e) =>{
        if(e.target.id ==='wrapper') onClose();
    }
    return(

        <div className=" fixed inset-0 bg-black bg-opacity-25 
        backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
            <div className="w-[600px] ">
                <div className="">
            <button className="text-white text-2xl" onClick={()=>onClose()}>X</button>
            </div>
            <div>
           
            {children}
            </div>
            
           </div>
                </div>
    )


}