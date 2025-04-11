export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  // rating: number;
}

export interface GitHubProfile {
  username: string;
  avatarUrl: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalContributions: number;
  latestActivity: string;
}

export interface PullRequest {
  id: string;
  title: string;
  number: number;
  repository: string;
  owner: string;
  mergedAt: string;
  url: string;
  description: string;
  additions?: number;
  deletions?: number;
  changedFiles?: number;
}

export interface ContributedRepo {
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  contributionCount: number;
}