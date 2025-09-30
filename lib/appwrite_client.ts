// lib/appwrite_client.ts
import { Client } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint) throw new Error('Missing NEXT_PUBLIC_APPWRITE_ENDPOINT');
if (!projectId) throw new Error('Missing NEXT_PUBLIC_APPWRITE_PROJECT_ID');

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

export default client;
