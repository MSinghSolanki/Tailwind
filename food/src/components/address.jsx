

export const Address = ({invisible,onClose,children})=>{
    if (!invisible) return null;

    const handleClose = (e) =>{
        if(e.target.id ==='wrapper') onClose();
    }
    return(

        <div className=" fixed inset-0 bg-black bg-opacity-25 
        backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
            <div className="w-[600px] ">
        
            
            <div className="flex items-baseline">
            <button className="text-black text-3xl" onClick={()=>onClose()}>X</button>
            {children}
            </div>
            
           </div>
                </div>
    )


}