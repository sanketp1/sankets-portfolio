"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Upload, Loader2 } from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

interface FileUploadProps {
  onUploadComplete: (url: string) => void
  currentImageUrl?: string
  bucketName?: string
  folderPath?: string
  accept?: string
  maxSizeMB?: number
}

export function FileUpload({
  onUploadComplete,
  currentImageUrl,
  bucketName = "portfolio",
  folderPath = "profile",
  accept = "image/*",
  maxSizeMB = 5,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds ${maxSizeMB}MB limit`)
      return
    }

    setError(null)
    setIsUploading(true)

    try {
      // Create a local preview
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Generate a unique file name
      const fileExt = file.name.split(".").pop()
      const fileName = `${folderPath}/${Date.now()}.${fileExt}`

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage.from(bucketName).upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (uploadError) {
        throw uploadError
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(data.path)

      // Call the callback with the URL
      onUploadComplete(publicUrlData.publicUrl)
    } catch (error) {
      console.error("Upload error:", error)
      setError("Failed to upload file. Please try again.")
      setPreviewUrl(currentImageUrl || null)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        {previewUrl ? (
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="Preview"
              fill
              className="object-cover rounded-full border-2 border-slate-200 dark:border-slate-700"
            />
          </div>
        ) : (
          <div className="w-32 h-32 mb-4 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700">
            <Upload className="w-8 h-8 text-slate-400" />
          </div>
        )}

        <div className="flex flex-col items-center">
          <Label
            htmlFor="file-upload"
            className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </>
            )}
          </Label>
          <input
            id="file-upload"
            type="file"
            className="sr-only"
            accept={accept}
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <p className="mt-2 text-xs text-slate-500">Max size: {maxSizeMB}MB</p>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  )
}
