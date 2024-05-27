import { get } from "http";
import Image from "next/image";
import PostedItem from "@/components/PostedItem";
import { PostedItemType } from "@/types/PostedItemType";

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
  const mockData: PostedItemType = {
    ID: 0,
    Title: "test-title",
    Body: "text-text",
    UserId: 0,
    UserName: "hogehoge",
    CreatedAt: new Date(),
    UpdatedAt: new Date()
  }

  const listData = [mockData, mockData, mockData];
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {listData.map(data => <PostedItem  postedItem={data}></PostedItem> )}
    </main>
  );
}
