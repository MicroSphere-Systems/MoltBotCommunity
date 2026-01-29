export * from './database'

// Navigation types
export interface NavItem {
  title: string
  href: string
  description?: string
  disabled?: boolean
  icon?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

// Search types
export interface SearchResult {
  id: string
  type: 'post' | 'user' | 'tag'
  title: string
  description?: string
  url: string
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export interface FormState {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

// SEO types
export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  noIndex?: boolean
}

// Breadcrumb types
export interface BreadcrumbItem {
  label: string
  href?: string
}
