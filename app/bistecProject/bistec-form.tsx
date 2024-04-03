'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/server'
// import { type User } from '@supabase/supabase-js'

export interface Project {
    id: string;
    projectName: string;
    startDate: Date;
  
  }

export default function BistecProjectForm() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [projectName, setProjectName] = useState<string | null>(null);
  const [projectDate, setProjectDate] = useState<string | null>(null);

  async function updateProfile({
    projectName,
    date,
  }: {
    projectName: string | null
    date: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('projects').upsert({
        projectName: projectName,
        projectDate: date,
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="projectname">Project Name</label>
        <input
          id="projectname"
          type="text"
          value={projectName || ''}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="projectdate">Project Date</label>
        <input
          id="projectdate"
          type="text"
          value={projectDate || ''}
          onChange={(e) => setProjectDate(e.target.value)}
        />
      </div>

      <div>
        <form action="/saveForm" method="post">
          <button className="button block" type="submit">
            save
          </button>
        </form>
      </div>
    </div>
  )
}