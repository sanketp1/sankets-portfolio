"use client"

import { motion } from "framer-motion"
import { Code, Database, Palette, Server, Smartphone, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function SkillsPage() {
  const skillCategories = [
    {
      icon: Code,
      title: "Frontend Development",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React/Next.js", level: 95, experience: "5+ years" },
        { name: "TypeScript", level: 90, experience: "4+ years" },
        { name: "Vue.js", level: 85, experience: "3+ years" },
        { name: "HTML/CSS", level: 95, experience: "6+ years" },
        { name: "Tailwind CSS", level: 90, experience: "3+ years" },
        { name: "Framer Motion", level: 80, experience: "2+ years" },
      ],
    },
    {
      icon: Server,
      title: "Backend Development",
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js/Express", level: 90, experience: "4+ years" },
        { name: "Python/Django", level: 85, experience: "3+ years" },
        { name: "REST APIs", level: 95, experience: "5+ years" },
        { name: "GraphQL", level: 80, experience: "2+ years" },
        { name: "Microservices", level: 75, experience: "2+ years" },
        { name: "Authentication/JWT", level: 90, experience: "4+ years" },
      ],
    },
    {
      icon: Database,
      title: "Database & Cloud",
      color: "from-purple-500 to-violet-500",
      skills: [
        { name: "MongoDB", level: 90, experience: "4+ years" },
        { name: "PostgreSQL", level: 85, experience: "3+ years" },
        { name: "Redis", level: 80, experience: "2+ years" },
        { name: "AWS", level: 75, experience: "2+ years" },
        { name: "Docker", level: 80, experience: "3+ years" },
        { name: "Firebase", level: 85, experience: "3+ years" },
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "React Native", level: 85, experience: "3+ years" },
        { name: "Flutter", level: 70, experience: "1+ years" },
        { name: "iOS Development", level: 65, experience: "1+ years" },
        { name: "Android Development", level: 70, experience: "2+ years" },
        { name: "Mobile UI/UX", level: 80, experience: "3+ years" },
        { name: "App Store Deployment", level: 85, experience: "3+ years" },
      ],
    },
    {
      icon: Palette,
      title: "Design & Tools",
      color: "from-pink-500 to-rose-500",
      skills: [
        { name: "Figma", level: 85, experience: "4+ years" },
        { name: "Adobe Creative Suite", level: 75, experience: "3+ years" },
        { name: "UI/UX Design", level: 80, experience: "4+ years" },
        { name: "Prototyping", level: 85, experience: "4+ years" },
        { name: "Design Systems", level: 80, experience: "3+ years" },
        { name: "User Research", level: 70, experience: "2+ years" },
      ],
    },
    {
      icon: Globe,
      title: "DevOps & Deployment",
      color: "from-indigo-500 to-blue-500",
      skills: [
        { name: "Git/GitHub", level: 95, experience: "6+ years" },
        { name: "CI/CD", level: 80, experience: "3+ years" },
        { name: "Vercel/Netlify", level: 90, experience: "4+ years" },
        { name: "Linux/Unix", level: 75, experience: "3+ years" },
        { name: "Nginx", level: 70, experience: "2+ years" },
        { name: "Monitoring/Analytics", level: 75, experience: "2+ years" },
      ],
    },
  ]

  const certifications = [
    { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2023" },
    { name: "Google Cloud Professional", issuer: "Google Cloud", year: "2023" },
    { name: "React Developer Certification", issuer: "Meta", year: "2022" },
    { name: "Full Stack Web Development", issuer: "freeCodeCamp", year: "2021" },
  ]

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
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">Skills & Expertise</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, tools, and technologies I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <span className="font-medium text-slate-900 dark:text-white">{skill.name}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {skill.experience}
                            </Badge>
                          </div>
                          <span className="text-sm text-slate-500 dark:text-slate-400">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Certifications & Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Badge className="w-8 h-8 text-white text-lg font-bold">✓</Badge>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{cert.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">{cert.issuer}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{cert.year}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning & Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Continuous Learning & Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Currently Learning</h3>
                  <div className="space-y-2">
                    <Badge variant="outline">Rust Programming</Badge>
                    <Badge variant="outline">Machine Learning</Badge>
                    <Badge variant="outline">Web3/Blockchain</Badge>
                    <Badge variant="outline">Kubernetes</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Next Goals</h3>
                  <div className="space-y-2">
                    <Badge variant="outline">AI/ML Integration</Badge>
                    <Badge variant="outline">System Architecture</Badge>
                    <Badge variant="outline">Technical Leadership</Badge>
                    <Badge variant="outline">Open Source Contribution</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Interests</h3>
                  <div className="space-y-2">
                    <Badge variant="outline">Performance Optimization</Badge>
                    <Badge variant="outline">Accessibility</Badge>
                    <Badge variant="outline">Developer Experience</Badge>
                    <Badge variant="outline">Mentoring</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
