"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Search, ArrowRight } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Web Development", "React", "Node.js", "Career", "Tutorials"]

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications: Best Practices and Patterns",
      excerpt:
        "Learn how to structure and organize your React applications for maximum scalability and maintainability. We'll cover component architecture, state management, and performance optimization.",
      content: "Full article content would go here...",
      author: "John Doe",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "React",
      tags: ["React", "JavaScript", "Architecture", "Best Practices"],
      image: "/placeholder.svg?height=300&width=600",
      featured: true,
    },
    {
      id: 2,
      title: "The Complete Guide to Node.js Performance Optimization",
      excerpt:
        "Discover techniques and strategies to optimize your Node.js applications for better performance, including profiling, caching, and database optimization.",
      content: "Full article content would go here...",
      author: "John Doe",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Node.js",
      tags: ["Node.js", "Performance", "Optimization", "Backend"],
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
    {
      id: 3,
      title: "From Junior to Senior: My 5-Year Journey in Tech",
      excerpt:
        "Reflecting on my career progression from a junior developer to a senior engineer. Lessons learned, challenges faced, and advice for aspiring developers.",
      content: "Full article content would go here...",
      author: "John Doe",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Career",
      tags: ["Career", "Growth", "Advice", "Personal"],
      image: "/placeholder.svg?height=300&width=600",
      featured: true,
    },
    {
      id: 4,
      title: "Modern CSS Techniques: Grid, Flexbox, and Beyond",
      excerpt:
        "Explore modern CSS layout techniques and how to create responsive, flexible designs using CSS Grid, Flexbox, and other contemporary approaches.",
      content: "Full article content would go here...",
      author: "John Doe",
      date: "2023-12-28",
      readTime: "10 min read",
      category: "Web Development",
      tags: ["CSS", "Layout", "Responsive Design", "Frontend"],
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
    {
      id: 5,
      title: "Building a Real-time Chat Application with Socket.io",
      excerpt:
        "Step-by-step tutorial on creating a real-time chat application using Node.js, Express, and Socket.io. Includes user authentication and message persistence.",
      content: "Full article content would go here...",
      author: "John Doe",
      date: "2023-12-20",
      readTime: "15 min read",
      category: "Tutorials",
      tags: ["Socket.io", "Real-time", "Tutorial", "Node.js"],
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
    {
      id: 6,
      title: "Understanding React Hooks: A Deep Dive",
      excerpt:
        "Comprehensive guide to React Hooks, including useState, useEffect, useContext, and custom hooks. Learn when and how to use them effectively.",
      content: "Full article content would go here...",
      author: "John Doe",
      date: "2023-12-15",
      readTime: "11 min read",
      category: "React",
      tags: ["React", "Hooks", "JavaScript", "Frontend"],
      image: "/placeholder.svg?height=300&width=600",
      featured: false,
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Blog & Insights</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Sharing knowledge, experiences, and insights about web development, technology trends, and career growth in
            the tech industry.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        {selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={600}
                        height={300}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Featured</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white mb-3 line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full group">
                        <Link href={`/blog/${post.id}`} className="flex items-center gap-2">
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
          </h2>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-300 text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                      {post.featured && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-start mb-3">
                        <CardTitle className="text-lg text-slate-900 dark:text-white line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                          {post.category}
                        </Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="w-full group">
                        <Link href={`/blog/${post.id}`} className="flex items-center gap-2">
                          Read Article
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Subscribe to my newsletter to get the latest articles, tutorials, and insights delivered directly to
                your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Enter your email" className="bg-white text-slate-900 border-0" />
                <Button variant="secondary" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
