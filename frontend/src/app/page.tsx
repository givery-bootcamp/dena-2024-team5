import { get } from "http";
import Image from "next/image";
import PostedItem from "@/components/PostedItem";

async function getData() {
  const res = await fetch('http://localhost:9000/hello')
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export default async function Home() {
  const data = await getData();
  const listData = [data, data, data, data];
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {listData.map(data => <PostedItem  message={data.message}></PostedItem> )}
    </main>
  );
}
