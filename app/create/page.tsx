'use client'

import { ChangeEvent, SetStateAction, useState } from "react"
import { useRouter } from "next/navigation"
export default function Create(){
    const router = useRouter();
    const [formData, setFormData]= useState({
        term: "", interpretation: ""
    }
    );

    const [isLoading, setIsLoading]= useState(false);
    const [errors, setErrors]= useState<string| null>(null);

    const handleInputChange= (
        e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>
    ) =>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }
    const handleSubmit= async (e: React.FormEvent) =>{
        e.preventDefault();

        if (!formData.term || !formData.interpretation){
            setErrors("All fields are required");
            return;
        }
        setErrors(null);
        setIsLoading(true);
        try{
            const response= await fetch('/api/interpretations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok){ 
                throw new Error('Failed to add interpretation');
            }
            router.push('/')

        }catch(error){
            console.log(error);
            setErrors("Something went wrong. Please try again later.");
        }finally{
            setIsLoading(false);
        }

    }
    return(
        <div>
            <h2 className= "text-2xl font-bold my-8">Add new Interpretation</h2>
            <form onSubmit={handleSubmit} className="flex gap-3 flex-col"> 
                <input type= "text" name="term" 
                placeholder="Term"  
                value={formData.term} 
                className="border p-2 rounded-md w-full"
                onChange= {handleInputChange} 
                />
                <textarea name="interpretation" rows={4} 
                placeholder="Interpretation" 
                value={formData.interpretation} 
                className="border py-1 px-4 rounded-md resize-none"
                onChange= {handleInputChange} 
                >

                </textarea>
                <button className="bg-blue-500 
                text-white px-4 py-1 rounded-md 
                uppercase text-sm 
                font-bold 
                tracking-widest 
                cursor-pointer"
                type= "submit"
                disabled= {isLoading}
                >
                    {isLoading? "Adding...":"Add Interpretation"}

                </button>
            </form>
            {errors && <p className=" text-red-500 mt-4">{errors}</p>}
        </div>
    )
}