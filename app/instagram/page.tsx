"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

type InstagramPost = {
  id: string
  imageUrl: string
  caption: string
}

export default function Instagram() {
  const [posts, setPosts] = useState<InstagramPost[]>([])

  useEffect(() => {
    // This is a placeholder. In a real application, you'd fetch this data from the Instagram API
    setPosts([
      { id: "1", imageUrl: "/placeholder.svg", caption: "Delicious appetizers for tonight's event!" },
      { id: "2", imageUrl: "/placeholder.svg", caption: "Behind the scenes at our latest photoshoot" },
      { id: "3", imageUrl: "/placeholder.svg", caption: "New menu item coming soon!" },
      // Add more posts...
    ])
  }, [])

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Instagram Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.caption}
              width={400}
              height={400}
              className="w-full h-64 object-cover"
            />
            <p className="p-4 text-sm">{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
