import client from "@/lib/appwrite_client";
import {Databases, ID, Query} from "appwrite";
import { NextResponse } from "next/server";

const database= new Databases(client);

async function createInterpretation(data: {term:string, interpretation: string}) {
    try{
    const response=await database.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        "Interpretations",
        ID.unique(),data
    );
    return response;
    }catch (error){
        console.error("Error creating interpretation:", error);
        throw new Error("Failed to create interpretation");
    }

}
async function fetchInterpretation() {
    try{
    const response=await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string ||
        "Interpretations",
        [Query.orderDesc("$createdAt")],
    );
    return response;
    }catch (error){
        console.error("Error fetching interpretation:", error);
        throw new Error("Failed to fetch interpretation");
    }

}

export async function POST(request: Request) {
    try{
        const{term, interpretation}=await request.json();
        const data= {term, interpretation};
        const response= await createInterpretation(data);
        return NextResponse.json({message: "Interpretation created successfully"});
    }catch (error){
        return NextResponse.json(
            {
                error: "Failed to create interpretation"

            }, 
            {status: 500});
}
}
export async function GET() {
   try{
    const interpretations= await fetchInterpretation();
    return NextResponse.json(interpretations);

   }catch (error){ 
    return NextResponse.json(
        {
            error: "Failed to fetch interpretations"
   }

    , {status: 500});
}
}
