import { type NextRequest, NextResponse } from "next/server"

// Mock database - in a real app, this would be your database
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB.",
    category: "Full Stack",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/example/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    image: "/placeholder.svg?height=300&width=500",
    featured: true,
    status: "Published",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    category: "Web Development",
    technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
    githubUrl: "https://github.com/example/taskmanager",
    liveUrl: "https://taskmanager-demo.com",
    image: "/placeholder.svg?height=300&width=500",
    featured: false,
    status: "Published",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")

    let filteredProjects = projects

    if (category && category !== "All") {
      filteredProjects = filteredProjects.filter((project) => project.category === category)
    }

    if (featured === "true") {
      filteredProjects = filteredProjects.filter((project) => project.featured)
    }

    return NextResponse.json({
      success: true,
      data: filteredProjects,
      total: filteredProjects.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { title, description, category, technologies } = body
    if (!title || !description || !category || !technologies) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const newProject = {
      id: projects.length + 1,
      title,
      description,
      category,
      technologies,
      githubUrl: body.githubUrl || "",
      liveUrl: body.liveUrl || "",
      image: body.image || "/placeholder.svg?height=300&width=500",
      featured: body.featured || false,
      status: body.status || "Draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    projects.push(newProject)

    return NextResponse.json(
      {
        success: true,
        data: newProject,
        message: "Project created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 })
  }
}
