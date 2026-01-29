export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type PostType = 'guide' | 'fix' | 'faq' | 'clawdbot' | 'question'
export type PostStatus = 'draft' | 'published' | 'archived'
export type UserRole = 'user' | 'moderator' | 'admin'
export type ReportStatus = 'pending' | 'resolved' | 'dismissed'
export type ReportedType = 'post' | 'answer' | 'comment' | 'user'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          avatar_url: string | null
          bio: string | null
          reputation: number
          role: UserRole
          is_banned: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          avatar_url?: string | null
          bio?: string | null
          reputation?: number
          role?: UserRole
          is_banned?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          avatar_url?: string | null
          bio?: string | null
          reputation?: number
          role?: UserRole
          is_banned?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          type: PostType
          title: string
          slug: string
          content: string
          excerpt: string | null
          views: number
          author_id: string
          status: PostStatus
          accepted_answer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: PostType
          title: string
          slug: string
          content: string
          excerpt?: string | null
          views?: number
          author_id: string
          status?: PostStatus
          accepted_answer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: PostType
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          views?: number
          author_id?: string
          status?: PostStatus
          accepted_answer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      answers: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          votes: number
          is_accepted: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          votes?: number
          is_accepted?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          votes?: number
          is_accepted?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          parent_type: 'post' | 'answer'
          parent_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_type: 'post' | 'answer'
          parent_id: string
          user_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_type?: 'post' | 'answer'
          parent_id?: string
          user_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          user_id: string
          answer_id: string
          value: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          answer_id: string
          value: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          answer_id?: string
          value?: number
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          post_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          post_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          post_count?: number
          created_at?: string
        }
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
      }
      reports: {
        Row: {
          id: string
          reporter_id: string
          reported_type: ReportedType
          reported_id: string
          reason: string
          status: ReportStatus
          resolved_by: string | null
          resolved_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          reporter_id: string
          reported_type: ReportedType
          reported_id: string
          reason: string
          status?: ReportStatus
          resolved_by?: string | null
          resolved_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          reporter_id?: string
          reported_type?: ReportedType
          reported_id?: string
          reason?: string
          status?: ReportStatus
          resolved_by?: string | null
          resolved_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      post_type: PostType
      post_status: PostStatus
      user_role: UserRole
      report_status: ReportStatus
      reported_type: ReportedType
    }
  }
}

// Convenience types
export type User = Database['public']['Tables']['users']['Row']
export type Post = Database['public']['Tables']['posts']['Row']
export type Answer = Database['public']['Tables']['answers']['Row']
export type Comment = Database['public']['Tables']['comments']['Row']
export type Vote = Database['public']['Tables']['votes']['Row']
export type Tag = Database['public']['Tables']['tags']['Row']
export type PostTag = Database['public']['Tables']['post_tags']['Row']
export type Report = Database['public']['Tables']['reports']['Row']

// Extended types with relations
export type PostWithAuthor = Post & {
  author: User
}

export type PostWithDetails = Post & {
  author: User
  tags: Tag[]
  answer_count: number
}

export type AnswerWithUser = Answer & {
  user: User
}

export type CommentWithUser = Comment & {
  user: User
}

export type QuestionWithAnswers = Post & {
  author: User
  tags: Tag[]
  answers: AnswerWithUser[]
}
