"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, FolderOpen, Mail, Plus, Edit, Trash2, Eye, Users, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { authManager, type AdminUser } from "@/lib/auth"
import { supabase, type Project, type ContactMessage, type Skill, type Experience, type Profile } from "@/lib/supabase"
import { FileUpload } from "@/components/file-upload"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    unreadMessages: 0,
    totalSkills: 0,
  })
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData()
    }
  }, [isAuthenticated])

  const checkAuth = async () => {
    const isValid = await authManager.validateSession()
    if (isValid) {
      const session = authManager.getSession()
      setIsAuthenticated(true)
      setCurrentUser(session?.user || null)
    }
    setLoading(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await authManager.login(loginForm.email, loginForm.password)

    if (result.success) {
      setIsAuthenticated(true)
      setCurrentUser(result.user || null)
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      })
    } else {
      toast({
        title: "Login failed",
        description: result.message || "Invalid credentials",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await authManager.logout()
    setIsAuthenticated(false)
    setCurrentUser(null)
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  const fetchDashboardData = async () => {
    try {
      // Fetch projects
      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })

      // Fetch messages
      const { data: messagesData } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

      // Fetch skills
      const { data: skillsData } = await supabase.from("skills").select("*").order("sort_order")

      // Fetch experience
      const { data: experienceData } = await supabase.from("experience").select("*").order("sort_order")

      // Fetch profile
      const { data: profileData } = await supabase.from("profile").select("*").single()

      setProjects(projectsData || [])
      setMessages(messagesData || [])
      setSkills(skillsData || [])
      setExperience(experienceData || [])
      setProfile(profileData)

      // Calculate stats
      setStats({
        totalProjects: projectsData?.length || 0,
        publishedProjects: projectsData?.filter((p) => p.is_visible).length || 0,
        unreadMessages: messagesData?.filter((m) => !m.is_read).length || 0,
        totalSkills: skillsData?.length || 0,
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      })
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id)

      if (error) throw error

      setProjects(projects.filter((p) => p.id !== id))
      toast({
        title: "Success",
        description: "Project deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      })
    }
  }

  const markMessageAsRead = async (id: string) => {
    try {
      const { error } = await supabase.from("contact_messages").update({ is_read: true }).eq("id", id)

      if (error) throw error

      setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: true } : m)))
      toast({
        title: "Success",
        description: "Message marked as read",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <p className="text-slate-600 dark:text-slate-300">Access the admin dashboard</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
              <p className="text-sm text-slate-500 mt-4 text-center">Demo credentials: admin@example.com / admin123</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Admin Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm text-slate-600 dark:text-slate-300">{currentUser?.email}</span>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Total Projects</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalProjects}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Published</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.publishedProjects}</p>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Unread Messages</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.unreadMessages}</p>
                </div>
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Skills</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalSkills}</p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Manage Projects</CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Add New Project</DialogTitle>
                          <DialogDescription>Create a new project entry for your portfolio.</DialogDescription>
                        </DialogHeader>
                        <ProjectForm onSuccess={fetchDashboardData} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.title}</TableCell>
                          <TableCell>{project.category}</TableCell>
                          <TableCell>
                            <Badge variant={project.is_visible ? "default" : "secondary"}>
                              {project.is_visible ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={project.is_featured ? "default" : "outline"}>
                              {project.is_featured ? "Featured" : "Regular"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => deleteProject(project.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages.map((message) => (
                        <TableRow key={message.id}>
                          <TableCell className="font-medium">{message.name}</TableCell>
                          <TableCell>{message.email}</TableCell>
                          <TableCell>{message.subject}</TableCell>
                          <TableCell>{new Date(message.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={message.is_read ? "secondary" : "default"}>
                              {message.is_read ? "Read" : "Unread"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Message from {message.name}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Email</Label>
                                      <p className="text-sm text-slate-600">{message.email}</p>
                                    </div>
                                    <div>
                                      <Label>Subject</Label>
                                      <p className="text-sm text-slate-600">{message.subject}</p>
                                    </div>
                                    <div>
                                      <Label>Message</Label>
                                      <p className="text-sm text-slate-600 whitespace-pre-wrap">{message.message}</p>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    {!message.is_read && (
                                      <Button onClick={() => markMessageAsRead(message.id)}>Mark as Read</Button>
                                    )}
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProfileForm profile={profile} onSuccess={fetchDashboardData} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Manage Skills</CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Skill
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Skill</DialogTitle>
                        </DialogHeader>
                        <SkillForm onSuccess={fetchDashboardData} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{skill.name}</h3>
                          <p className="text-sm text-slate-600">
                            {skill.category} • Level {skill.proficiency_level}/5
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance">Maintenance Mode</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Enable to show maintenance page to visitors
                      </p>
                    </div>
                    <Switch id="maintenance" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics">Analytics Tracking</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Enable Google Analytics tracking</p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="comments">Blog Comments</Label>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Allow comments on blog posts</p>
                    </div>
                    <Switch id="comments" defaultChecked />
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

// Project Form Component
function ProjectForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    long_description: "",
    category: "",
    technologies: "",
    github_url: "",
    demo_url: "",
    image_url: "",
    is_featured: false,
    is_visible: true,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("projects").insert([
        {
          ...formData,
          technologies: formData.technologies.split(",").map((t) => t.trim()),
        },
      ])

      if (error) throw error

      toast({
        title: "Success",
        description: "Project created successfully",
      })
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, image_url: url })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
        <Input
          id="technologies"
          value={formData.technologies}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          placeholder="React, Node.js, PostgreSQL"
          required
        />
      </div>
      <div>
        <Label>Project Image</Label>
        <FileUpload
          onUploadComplete={handleImageUpload}
          currentImageUrl={formData.image_url}
          bucketName="portfolio"
          folderPath="projects"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="visible"
            checked={formData.is_visible}
            onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
          />
          <Label htmlFor="visible">Visible</Label>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </Button>
      </DialogFooter>
    </form>
  )
}

// Profile Form Component
function ProfileForm({ profile, onSuccess }: { profile: Profile | null; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    title: profile?.title || "",
    bio: profile?.bio || "",
    email: profile?.email || "",
    location: profile?.location || "",
    github_url: profile?.github_url || "",
    linkedin_url: profile?.linkedin_url || "",
    profile_image_url: profile?.profile_image_url || "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (profile) {
        const { error } = await supabase.from("profile").update(formData).eq("id", profile.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("profile").insert([formData])
        if (error) throw error
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleProfileImageUpload = (url: string) => {
    setFormData({ ...formData, profile_image_url: url })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <Label className="mb-4 text-lg font-medium">Profile Picture</Label>
        <FileUpload
          onUploadComplete={handleProfileImageUpload}
          currentImageUrl={formData.profile_image_url}
          bucketName="portfolio"
          folderPath="profile"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            value={formData.github_url}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input
            id="linkedin"
            value={formData.linkedin_url}
            onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
          />
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}

// Skill Form Component
function SkillForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency_level: 3,
    is_visible: true,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("skills").insert([formData])

      if (error) throw error

      toast({
        title: "Success",
        description: "Skill added successfully",
      })
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Skill Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="frontend, backend, database, tools"
          required
        />
      </div>
      <div>
        <Label htmlFor="level">Proficiency Level (1-5)</Label>
        <Input
          id="level"
          type="number"
          min="1"
          max="5"
          value={formData.proficiency_level}
          onChange={(e) => setFormData({ ...formData, proficiency_level: Number.parseInt(e.target.value) })}
          required
        />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Skill"}
        </Button>
      </DialogFooter>
    </form>
  )
}
