// 'use client'
// import { ChangeEvent, useEffect, useState } from "react";

// export default function EditPage({params}:{params:{id:string}}){

//     const [formData, setFormData]= useState({
//             term: "", interpretation: ""
//         }
//         );
    
//         const [isLoading, setIsLoading]= useState(false);
//         const [errors, setErrors]= useState<string| null>(null);

//         useEffect(()=>{
//             const fetchData= async ()=>{
//                 try{
//                     const response= await fetch(`/api/interpretations/${params.id}`);
//                     if (!response.ok){
//                         throw new Error('Failed to fetch interpretation');
//                     }

//                     const data = await response.json();
//                     console.log(data);
//                     setFormData({term: data.interpretation.term, interpretation: data.interepretation.interpretation});

//                 }catch(error){
//                     setErrors("Failed to load iterpretation.");
//                 }
//             };
//             fetchData();
//         },[])

//             const handleInputChange= (
//                 e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>
//             ) =>{
//                 setFormData((prevData)=>(
//                     {
//                         ...prevData,
//                         [e.target.name]: e.target.value
//                     }
//                 ))
//             }
//     return(
//         <div>
//             <h2 className= "text-2xl font-bold my-8">Edit Interpretation</h2>
//             <form className="flex gap-3 flex-col"> 
//                 <input type= "text" name="term" placeholder="Term" value={formData.term} onChange={handleInputChange} className="border p-2 rounded-md w-full" />
//                 <textarea name="interpretation" rows={4} placeholder="Interpretation" value={formData.interpretation} onChange={handleInputChange} className="border py-1 px-4 rounded-md resize-none">

//                 </textarea>
//                 <button className="bg-blue-500 text-white 
//                 px-4 py-1 
//                 rounded-md 
//                 uppercase text-sm 
//                 font-bold 
//                 tracking-widest cursor-pointer">Update Interpretation

//                 </button>
//             </form>
//         </div>
//     )
// }
'use client'

import { ChangeEvent, useEffect, useState, FormEvent } from "react";

type FormData = {
    term: string;
    interpretation: string;
}

type Props = {
    params: { id: string };
}

export default function EditPage({ params }: Props) {

    const [formData, setFormData] = useState<FormData>({
        term: "",
        interpretation: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/interpretations/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch interpretation');
                }

                const data = await response.json();
                setFormData({
                    term: data.interpretation.term,
                    interpretation: data.interpretation.interpretation
                });

            } catch (error) {
                setErrors("Failed to load interpretation.");
            }
        };

        fetchData();
    }, [params.id]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors(null);

        try {
            const response = await fetch(`/api/interpretations/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to update interpretation");
            }

            // Optionally, show success message or redirect
            alert("Interpretation updated successfully");

        } catch (error) {
            setErrors("Failed to update interpretation.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold my-8">Edit Interpretation</h2>
            {errors && <p className="text-red-500">{errors}</p>}
            <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
                <input
                    type="text"
                    name="term"
                    placeholder="Term"
                    value={formData.term}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                />
                <textarea
                    name="interpretation"
                    rows={4}
                    placeholder="Interpretation"
                    value={formData.interpretation}
                    onChange={handleInputChange}
                    className="border py-1 px-4 rounded-md resize-none"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md uppercase text-sm font-bold tracking-widest cursor-pointer"
                >
                    {isLoading ? "Updating..." : "Update Interpretation"}
                </button>
            </form>
        </div>
    )
}

