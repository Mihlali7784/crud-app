import client from "@/lib/appwrite_client";
import {Databases} from "appwrite";
import { NextResponse } from "next/server";

const database= new Databases(client);
//Fetching a specific interpretation
async function fetchInterpretation (id: string) {
    try{
        const interpretation= await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            id
        );
        return interpretation;
    }catch (error){
        console.error("Error fetching interpretation:", error);
        throw new Error("Failed to fetch interpretation");
    }
}

//Deleting a specific interpretation
async function deleteInterpretation (id: string) {
    try{
        const response= await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            id
        );
        return response;
    }
    catch(error){
        console.error("Error deleting interpretation:", error);
        throw new Error("Failed to delete interpretation"); 
    }
}

//Deleting a specific interpretation
async function updateInterpretation (id: string ,data: {term:string, interpretation: string}) {
    try{
        const response= await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            id,
            data
        );
        return response;
    }
    catch(error){
        console.error("Error deleting interpretation:", error);
        throw new Error("Failed to delete interpretation"); 
    }
}
export async function GET(
    request: Request, 
    {params}: {params:{id:string}} ){
        try{
            const id = params.id;
            const interpretation = await fetchInterpretation(id);
            return NextResponse.json({interpretation});
        }catch (error){
            return NextResponse.json(
                {error: "Fail to fetch interpretation"}, 
                {status: 500});


        }


}
export async function DELETE(request: Request, 
    {params}: {params:{id:string}} ){
        try{
            const id = params.id;
            
            await deleteInterpretation(id);
            return NextResponse.json({message: "Interpretation deleted successfully"});
        }catch (error){
            return NextResponse.json(
                {error: "Fail to delete interpretation"}, 
                {status: 500});


        }


}
export async function PUT(request: Request, 
    {params}: {params:{id:string}} ){
        try{
            const id = params.id;
            const interpretation= await request.json();
            await updateInterpretation(id, interpretation);
            return NextResponse.json({message: "Interpretation updated successfully"});
        }catch (error){
            return NextResponse.json(
                {error: "Fail to update interpretation"}, 
                {status: 500});


        }


}