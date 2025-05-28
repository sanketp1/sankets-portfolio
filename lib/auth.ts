import { supabase } from "./supabase"

export interface AdminUser {
  id: string
  email: string
  role: string
}

export interface AuthSession {
  user: AdminUser
  sessionToken: string
  expiresAt: string
}

class AuthManager {
  private static instance: AuthManager
  private session: AuthSession | null = null

  private constructor() {
    // Load session from localStorage on initialization
    if (typeof window !== "undefined") {
      const savedSession = localStorage.getItem("admin_session")
      if (savedSession) {
        try {
          this.session = JSON.parse(savedSession)
        } catch (error) {
          localStorage.removeItem("admin_session")
        }
      }
    }
  }

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager()
    }
    return AuthManager.instance
  }

  async login(email: string, password: string): Promise<{ success: boolean; message?: string; user?: AdminUser }> {
    try {
      // Call the admin_login function
      const { data, error } = await supabase.rpc("admin_login", {
        email,
        password,
      })

      if (error) {
        return { success: false, message: "Login failed" }
      }

      if (!data.success) {
        return { success: false, message: data.message }
      }

      // Generate session token (in a real app, this would be done server-side)
      const sessionToken = this.generateSessionToken()
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours

      // Create session in database
      const { error: sessionError } = await supabase.rpc("create_admin_session", {
        p_user_id: data.user.id,
        p_session_token: sessionToken,
        p_expires_at: expiresAt,
      })

      if (sessionError) {
        return { success: false, message: "Failed to create session" }
      }

      // Store session
      this.session = {
        user: data.user,
        sessionToken,
        expiresAt,
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_session", JSON.stringify(this.session))
      }

      return { success: true, user: data.user }
    } catch (error) {
      return { success: false, message: "Login failed" }
    }
  }

  async logout(): Promise<void> {
    if (this.session) {
      // Invalidate session in database
      await supabase.rpc("logout_admin_session", {
        p_session_token: this.session.sessionToken,
      })
    }

    // Clear local session
    this.session = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_session")
    }
  }

  async validateSession(): Promise<boolean> {
    if (!this.session) {
      return false
    }

    try {
      const { data, error } = await supabase.rpc("validate_admin_session", {
        p_session_token: this.session.sessionToken,
      })

      if (error || !data.valid) {
        this.session = null
        if (typeof window !== "undefined") {
          localStorage.removeItem("admin_session")
        }
        return false
      }

      return true
    } catch (error) {
      return false
    }
  }

  getSession(): AuthSession | null {
    return this.session
  }

  isAuthenticated(): boolean {
    return this.session !== null
  }

  private generateSessionToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }
}

export const authManager = AuthManager.getInstance()
