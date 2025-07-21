export interface ProjectModal {
  id: number
  status: string
  sort: number | null
  user_created: string
  date_created: string
  user_updated: string
  date_updated: string
  project_name: string
  url: string
  tags: string[]
  year: string
  is_live: boolean
  seo_title: string | null
  seo_description: string | null
  case_study: string | null
  client_name: string | null
  client_testimonial: string | null
  featured_image: string | null
  collaborators: { collaborators_id: number }[]
}

export interface CollaboratorModal {
  collaborators_id: number
  id: number
  status: string
  sort: number | null
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
  name: string
  designation: string
  url: string
  info: string
  email: string
  password: string
}

export interface TaskModal {
  id: number
  status: string
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
  client_name: string
  project_name: string
  task_title: string
  details: string
  category: string
  person: number
}
