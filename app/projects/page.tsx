"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = ["All", "Web Development", "Mobile App", "Full Stack", "UI/UX"]

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Full Stack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Web Development",
      technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false,
    },
    {
      id: 3,
      title: "Mobile Fitness Tracker",
      description:
        "Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Mobile App",
      technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "A responsive portfolio website with dynamic content management, blog functionality, and admin panel.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Web Development",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Dashboard Analytics",
      description:
        "Business intelligence dashboard with data visualization, real-time analytics, and customizable reports.",
      image: "/placeholder.svg?height=300&width=500",
      category: "Full Stack",
      technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
    },
    {
      id: 6,
      title: "Design System",
      description:
        "Comprehensive design system with reusable components, documentation, and design tokens for consistent UI/UX.",
      image: "/placeholder.svg?height=300&width=500",
      category: "UI/UX",
      technologies: ["Storybook", "Figma", "React", "Styled Components"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false,
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

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
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">My Projects</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A collection of projects that showcase my skills and passion for development.
          </p>
        </motion.div>

        {/* Filters and Search */}
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
                placeholder="Search projects..."
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
                  <Filter className="w-4 h-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Projects */}
        {selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Featured Projects</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {projects
                .filter((p) => p.featured)
                .slice(0, 2)
                .map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={500}
                          height={300}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Featured</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <CardTitle className="text-xl text-slate-900 dark:text-white">{project.title}</CardTitle>
                          <Badge variant="outline">{project.category}</Badge>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                          <Button size="sm" className="flex-1">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {selectedCategory === "All" ? "All Projects" : `${selectedCategory} Projects`}
          </h2>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-300 text-lg">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                      {project.featured && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <CardTitle className="text-lg text-slate-900 dark:text-white">{project.title}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </Button>
                        <Button size="sm" className="flex-1">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
